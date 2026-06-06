/* Forged Frameworks — Tweaks app (controls brand + motion of the portfolio) */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#bc6c3c",
  "headingFont": "Atkinson Hyperlegible",
  "bgAnimation": true,
  "rainOpacity": 10,
  "revealMotion": true
}/*EDITMODE-END*/;

function darken(hex, amt) {
  // amt 0..1 toward black
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.round(r * (1 - amt)); g = Math.round(g * (1 - amt)); b = Math.round(b * (1 - amt));
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function FFTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(function () {
    const root = document.documentElement;
    root.style.setProperty('--ff-copper', t.accent);
    root.style.setProperty('--ff-copper-hot', darken(t.accent, 0.15));
    root.style.setProperty('--color-accent', t.accent);
    root.style.setProperty('--color-accent-hot', darken(t.accent, 0.15));
    root.style.setProperty('--font-sans', "'" + t.headingFont + "', 'Segoe UI', Tahoma, Verdana, sans-serif");

    const m = document.getElementById('matrix');
    if (m) {
      m.style.display = t.bgAnimation ? '' : 'none';
      m.style.opacity = String((t.rainOpacity || 0) / 100);
    }
    document.body.classList.toggle('no-motion', !t.revealMotion);
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Brand" />
      <TweakColor label="Accent colour" value={t.accent}
        options={['#bc6c3c', '#a05b32', '#2c3e50', '#1F8A5B']}
        onChange={(v) => setTweak('accent', v)} />
      <TweakRadio label="Typeface" value={t.headingFont}
        options={['Atkinson Hyperlegible', 'Lexend']}
        onChange={(v) => setTweak('headingFont', v)} />

      <TweakSection label="Forge-rain background" />
      <TweakToggle label="Background animation" value={t.bgAnimation}
        onChange={(v) => setTweak('bgAnimation', v)} />
      <TweakSlider label="Rain opacity" value={t.rainOpacity} min={0} max={20} step={1} unit="%"
        onChange={(v) => setTweak('rainOpacity', v)} />

      <TweakSection label="Motion" />
      <TweakToggle label="Reveal-on-scroll" value={t.revealMotion}
        onChange={(v) => setTweak('revealMotion', v)} />
    </TweaksPanel>
  );
}

var __ffTweakRootEl = document.getElementById('tweaks-root');
if (__ffTweakRootEl) {
  if (!__ffTweakRootEl.__ffRoot) __ffTweakRootEl.__ffRoot = ReactDOM.createRoot(__ffTweakRootEl);
  __ffTweakRootEl.__ffRoot.render(<FFTweaks />);
}
