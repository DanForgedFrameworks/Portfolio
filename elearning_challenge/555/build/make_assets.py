#!/usr/bin/env python
"""Generate the social-preview card (og.png) and favicon for The Confirmation Test."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUT = os.path.dirname(os.path.abspath(__file__))
FONTS = r"C:\Windows\Fonts"

# --- Forged Frameworks palette ---
COPPER      = (229, 107, 45)    # #e56b2d
COPPER_DK   = (190, 84, 31)
COPPER_DKR  = (150, 64, 22)
CREAM       = (255, 244, 226)   # #fff4e2
SPHERE_HI   = (247, 233, 205)
SPHERE_MID  = (224, 188, 134)
SPHERE_LO   = (193, 146, 92)
INK_FEAT    = (160, 86, 46)     # facial features
WHITE       = (255, 255, 255)

def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)

# ---------------------------------------------------------------- sphere
def draw_harmony(target, cx, cy, R, feat=INK_FEAT):
    """A soft 3D cream sphere with HARMONY's content smiley face, masked clean."""
    SS = 2                                   # supersample for smooth rim
    box = int(R * 2.4) * SS
    tile = Image.new("RGBA", (box, box), (0, 0, 0, 0))
    td = ImageDraw.Draw(tile)
    bcx = bcy = box // 2
    rr = R * SS
    # radial shading pooled up-left, drawn big then masked to the true circle
    lx, ly = bcx - rr * 0.30, bcy - rr * 0.34
    steps = int(rr)
    for i in range(int(rr * 1.6), 0, -1):
        t = min(1.0, i / steps)
        col = tuple(int(SPHERE_LO[c] + (SPHERE_HI[c] - SPHERE_LO[c]) * (1 - t)) for c in range(3))
        td.ellipse([lx - i, ly - i, lx + i, ly + i], fill=col + (255,))
    # mask to a single clean circle centred at the sphere centre
    mask = Image.new("L", (box, box), 0)
    ImageDraw.Draw(mask).ellipse([bcx - rr, bcy - rr, bcx + rr, bcy + rr], fill=255)
    tile.putalpha(mask)
    td = ImageDraw.Draw(tile)
    # subtle concentric rim
    td.ellipse([bcx - rr, bcy - rr, bcx + rr, bcy + rr], outline=(176, 130, 80, 180), width=max(2, int(rr // 90)))

    # features (drawn in the supersampled tile, centred on the sphere)
    def S(v):  # scale to tile space
        return v * SS
    fw = max(3, int(rr * 0.055))
    # eyes: gentle upward arcs (content/closed) -> top half of small ellipse
    eye_w, eye_h = rr * 0.26, rr * 0.20
    eye_y = bcy - rr * 0.16
    for ex in (bcx - rr * 0.34, bcx + rr * 0.34):
        td.arc([ex - eye_w/2, eye_y - eye_h/2, ex + eye_w/2, eye_y + eye_h/2],
               start=200, end=340, fill=feat + (255,), width=fw)
    # smile: wide lower arc
    sm_w, sm_h = rr * 0.62, rr * 0.55
    sm_y = bcy + rr * 0.10
    td.arc([bcx - sm_w/2, sm_y - sm_h/2, bcx + sm_w/2, sm_y + sm_h/2],
           start=18, end=162, fill=feat + (255,), width=int(fw*1.15))

    # downsample and paste onto the target
    tile = tile.resize((box // SS, box // SS), Image.LANCZOS)
    target.paste(tile, (int(cx - box // SS // 2), int(cy - box // SS // 2)), tile)

# ---------------------------------------------------------------- OG card
def make_og():
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), COPPER)
    d = ImageDraw.Draw(img)
    # vignette: darker toward edges via big blurred radial
    vg = Image.new("L", (W, H), 0)
    ImageDraw.Draw(vg).ellipse([W*0.12, H*0.05, W*0.88, H*1.15], fill=110)
    vg = vg.filter(ImageFilter.GaussianBlur(160))
    light = Image.new("RGB", (W, H), (245, 130, 70))
    img = Image.composite(light, img, vg)
    d = ImageDraw.Draw(img)

    # halo behind sphere
    sx, sy, R = 300, 315, 150
    halo = Image.new("L", (W, H), 0)
    ImageDraw.Draw(halo).ellipse([sx-R*1.5, sy-R*1.5, sx+R*1.5, sy+R*1.5], fill=90)
    halo = halo.filter(ImageFilter.GaussianBlur(60))
    glow = Image.new("RGB", (W, H), (255, 222, 180))
    img = Image.composite(glow, img, halo)
    d = ImageDraw.Draw(img)

    draw_harmony(img, sx, sy, R)

    # sparkles
    for (px, py, s) in [(sx+150, sy-120, 9), (sx-140, sy+120, 7), (sx+120, sy+140, 6), (sx-150, sy-90, 6)]:
        d.line([px-s, py, px+s, py], fill=CREAM, width=3)
        d.line([px, py-s, px, py+s], fill=CREAM, width=3)

    # text block, right side
    tx = 540
    pill_font = font("Montserrat-Bold.ttf", 26)
    label = "E-LEARNING CHALLENGE #555"
    pad = 18
    bb = d.textbbox((0,0), label, font=pill_font)
    pw, ph = bb[2]-bb[0], bb[3]-bb[1]
    d.rounded_rectangle([tx, 150, tx + pw + pad*2, 150 + ph + pad*1.4], radius=26,
                        fill=(255, 240, 222))
    d.text((tx+pad, 150 + pad*0.55), label, font=pill_font, fill=COPPER_DKR)

    title_font = font("Montserrat-Bold.ttf", 92)
    d.text((tx, 222), "The", font=title_font, fill=WHITE)
    d.text((tx, 318), "Confirmation", font=font("Montserrat-Bold.ttf", 92), fill=WHITE)
    d.text((tx, 414), "Test", font=title_font, fill=CREAM)

    sub_font = font("Montserrat-Medium.ttf", 30)
    d.text((tx+4, 524), "HARMONY  ·  Onboarding Assistant", font=sub_font, fill=(255, 232, 210))

    img.save(os.path.join(OUT, "og.png"), "PNG")
    print("wrote og.png", img.size)

# ---------------------------------------------------------------- favicon
def make_icon():
    S = 512
    img = Image.new("RGB", (S, S), COPPER)
    d = ImageDraw.Draw(img)
    # rounded copper tile
    tile = Image.new("L", (S, S), 0)
    ImageDraw.Draw(tile).rounded_rectangle([0,0,S-1,S-1], radius=96, fill=255)
    base = Image.new("RGB", (S, S), COPPER)
    out = Image.new("RGBA", (S, S), (0,0,0,0))
    out.paste(base, (0,0), tile)
    d = ImageDraw.Draw(out)
    draw_harmony(out, S//2, int(S*0.46), int(S*0.30), feat=COPPER_DKR)
    out.save(os.path.join(OUT, "favicon.png"), "PNG")
    # smaller copies
    out.resize((180,180), Image.LANCZOS).save(os.path.join(OUT, "apple-touch-icon.png"), "PNG")
    out.resize((32,32), Image.LANCZOS).save(os.path.join(OUT, "favicon-32.png"), "PNG")
    print("wrote favicon.png / apple-touch-icon.png / favicon-32.png")

make_og()
make_icon()
