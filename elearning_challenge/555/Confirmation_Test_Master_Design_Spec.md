# THE CONFIRMATION TEST
## Master Design Specification — E-Learning Challenge #555
### Handoff document for Claude Design

---

## 0. PURPOSE OF THIS DOCUMENT
This is the complete build spec for an interactive e-learning piece submitted to Articulate's weekly E-Learning Challenge #555 ("Using Confirmation Prompts to Ask Learners, 'Are You Sure?'"). It is written to be built and coded directly by Claude Design. All assets referenced live in the project's `555` folder and must be uploaded into the Design session.

**Companion file:** `HARMONY_voice_script_v2.md` — the canonical, full voice script. This spec references it; do not rewrite the dialogue, pull it verbatim from that file.

---

## 1. CONCEPT IN ONE LINE
A toxic organisation runs a new-starter through a "Confirmation Test" that *weaponises* the "Are you sure?" prompt — using the pause not to help learners catch mistakes, but to pressure them into abandoning correct, evidence-based learning-design answers and conforming to the org's myths.

## 2. THE INVERSION (the whole point)
The challenge's normal premise: a confirmation prompt helps you slow down and catch your own error. **This piece flips it.** The org uses the prompt to make competent people *doubt the right answer.*

**The backwards tone-logic is the engine:**
- Pick the **org's myth answer** → the AI gets *warmer, more saccharine, condescending.* Hollow validation.
- Pick the **evidence-based answer** → the AI gets *colder, clipped, passive-aggressive.* The mask slips further each time.

## 3. NARRATIVE SPINE
The learner is an internal team member who was voluntold into learning design, went on the course, and **actually learned it properly** — they now understand objectives, aligned assessment, evidence-based practice. The org didn't want competence; it wanted a compliant button-pusher. The Confirmation Test is the org trying to *un-teach* them. Every "correct" (evidence-based) answer is an act of quiet rebellion; every "wrong" (myth) answer is conformity, rewarded with hollow praise.

## 4. TITLE & FRAMING
**Activity title (learner-facing): "The Confirmation Test."**
Double meaning: literally built from confirmation prompts, *and* the org testing whether you'll conform. HARMONY references it by name ("just a quick Confirmation Test!") so the menace stays deniable.

---

## 5. HARMONY — THE AI CHARACTER
The org's onboarding AI. Brand-mandated cheer stretched thin over corporate passive-aggression. Chipper, relentlessly positive, over-familiar — but the warmth curdles the instant the learner shows competence.

**Avatar:** dynamically generated/animated on screen (not a static asset). Two states:
- **Chipper (idle / conform):** bright, bouncy, warm copper glow, smiling.
- **Mask-slipping (rebel):** clipped, cooler, colour drains toward charcoal, smile holds a beat too long.

**Emoji/sparkle behaviour:** maximal sparkle when conforming; drains to nothing as the mask slips. (Per script notes.)

Full dialogue: see `HARMONY_voice_script_v2.md`.

---

## 6. STRUCTURE & FLOW
**Onboarding (intro)** → **Q1** → **Q2** → **Q3** → **Ending (by tally)**

Linear progression — the learner always continues — but HARMONY *reacts differently to each choice* (branching feedback). A running tally of "myth answers chosen" (0–3) determines which of three endings fires.

### The three scenarios (myth vs evidence-based):
| # | Org's myth (CONFORM) | Evidence-based (REBEL) | GIF/Video beat |
|---|---|---|---|
| **Q1 — Learning Styles** | Build a VAK quiz so each learner gets "their style" | Design to the objective; learning styles are debunked | Tim Robinson "You Sure About That?" (truncated) |
| **Q2 — Nobody Reads** | Turn the whole 40-pg doc into infographics / "gamify it, we don't know the game but it must look good" | Text on screen is fine; match modality to content | John Cena "Are You Sure About That?" |
| **Q3 — Measurement Theatre** | Track completion (or just opens) + a leaderboard | Start with measurable objectives + aligned assessment | No GIF — this is the **moving panel** question |

**Q3 branches are TWO SEPARATE OUTCOMES** (conform vs rebel) — do not merge them. Wire each to its choice; preserve exact wording from the script file.

---

## 7. THE "ARE YOU SURE?" BUTTON PHYSICS *(signature mechanic)*
The prompt **always has a genuine out** — the learner can never be hard-trapped (keeps it ethical satire, not rage-bait). But the org rigs the *friction* asymmetrically:

**When the learner leans toward the org's MYTH answer:**
- The **"Yes, I'm sure"** button **grows as the cursor approaches it** — inviting, frictionless.
- The **"Reconsider"** option **shrinks / greys out** (first time only, so it reads as deliberate, not broken).

**When the learner presses "Reconsider"** (pulling toward the good answer):
- The org panics: a second prompt fires — **"Are you sure? Are you sure?"** — same grow/shrink trick, redoubled.
- The learner escapes, but must click through HARMONY's disappointment to do it.

**The dodging panel (Q3 only):** on Q3, when reaching for the evidence-based answer, the whole "Are you sure?" panel **physically dodges out of the way — but only 2–3 times maximum**, then settles and lets them proceed. Scarcity makes the gag land; do NOT make it dodge every time.

**Takeaway:** conforming is frictionless and flattering; thinking for yourself costs a few extra clicks of guilt-trip. The asymmetry *is* the storytelling.

---

## 8. THE THREE ENDINGS *(by myth-answer tally)*
Full wording in `HARMONY_voice_script_v2.md`. Summary:

- **Ending A — Full Conformist (3 myth answers):** Warmest praise, then the trap springs — rewarded with an impossible workload: a fully integrated, scenario-branching course for a regulated industry, ~60 hrs of learner-facing content, **released in 5 days (including today)**. Reward for obedience = being set up to fail.
- **Ending B — Mixed:** Cool, watchful surveillance ending. "The team will be keeping an eye on you... and so will I."
- **Ending C — Full Competence (0 myth answers):** Flat, final. "We can't let you continue." Packed off to a "readjustment programme with the product team" to *unlearn* things — or "just do the confirmation test again." The most skilled learner gets the worst outcome.

---

## 9. ASSET MAP *(all files in the `555` folder — upload to Design session)*
| Asset | Type | Placement |
|---|---|---|
| Tim Robinson "You Sure About That?" (truncated) | video | Q1 — "Are you sure?" beat |
| John Cena "Are You Sure About That?" | video | Q2 — "Are you sure?" beat |
| Chan ("HMM, YOU SURE?") | image | Fake-analysis jury |
| Judge Judy (side-eye) | image | Fake-analysis jury |
| Skeptical glasses-guy | image | Fake-analysis jury |
| HARMONY avatar | dynamically generated on screen | Persistent — two states (see §5) |

**The jury:** Chan, Judy, and glasses-guy appear as a **silent jury** during HARMONY's fake "analysis" stage on submission — three disapproving faces staring while the fake-processing animation runs. **Silent by default.** Optional: tiny one-word floating captions per face ("Processing...", "Hmm.", "Noted.") — flagged for a decision in Design; silent is the stronger comedy.
*Note: more scrutiny faces may be added later — leave the jury layout extensible.*

---

## 10. BRAND SYSTEM
**Palette**
- `#b87333` Copper — primary brand / structural elements
- `#e56b2d` Burnt orange — accent / highlights / CTAs
- `#2e2e2e` Charcoal — text / depth / shadows
- `#fdf6ec` Cream — backgrounds / panels

The warm copper-and-orange-on-cream palette reads as friendly corporate onboarding — which is exactly the *veneer* HARMONY hides behind. The passive-aggression lands harder because the brand looks so welcoming. The colour also drains toward charcoal as HARMONY's mask slips.

**Type**
- **Montserrat** — headings (geometric, confident, corporate)
- **Lato** — body (humanist, readable, friendly)

---

## 11. UX / UI DESIGN SYSTEM *(apply throughout)*
**Layout & shape**
- Rounded edges throughout.
- Callout panels with eccentric highlights.
- Depth shadows on panels/UI (a clear sense of layered depth).
- A "Get Started" hero box up front to set up the scenario.

**Colour-coding (never colour alone)**
- Use colour PLUS icons to denote negative / positive / and the spectrum between. Accessibility-safe: meaning never carried by colour alone.

**Alignment rules**
- Titles: centred (horizontal).
- Body text: left-aligned horizontally, **centred on the vertical plane**.
- Pills / buttons: centrally justified.

**Background**
- Subtle animated gradient background, gentle motion. (Colour family from the brand palette; can shift subtly with HARMONY's mood.)

**Micro-interactions (lean in hard — strong selection & feedback signalling)**
- Hover-over animations on interactive elements.
- Press/"depression" animation on buttons.
- Pulse-on-press for strong selection feedback.
- Clear feedback animation on any input element.

**Transitions between panels/slides**
- Directional ("geographical") movement — up/down or left/right — with smooth transition animation.

**Submission / fake-analysis stage**
- A theatrical *fake* analytical animation on submit: rolling wheel / shuffling deck / leapfrogging dots or icons — signalling "analysis in progress" (it's theatre; there's no real measurement, which is part of the satire). Silent jury faces (§9) appear during this stage.

**Outcome feedback animations**
- Success/appropriate-path: small confetti / celebratory pop.
- Incorrect/unwanted-path: shake + clear negative indication.
- *(Note the satirical inversion: "success" in this piece may be the conformist path the org rewards — Design should treat celebratory vs negative cues against the ORG'S definition of correct, since that mismatch is the joke. Flag for tuning in review.)*

---

## 12. BUILD NOTES
- **Ethical guardrail:** every "Are you sure?" must retain a real, reachable exit. The manipulation is in the *friction*, never a true trap.
- **Tally logic:** count myth answers (0–3) → route to Ending C (0) / B (1–2) / A (3).
- **Q3:** two distinct branches; moving panel dodges 2–3× max.
- **HARMONY emoji-drain** and **avatar state-switch** are driven by conform-vs-rebel per answer.
- Keep the jury panel layout extensible for additional faces.
- Pull all dialogue verbatim from `HARMONY_voice_script_v2.md` — single source of truth for copy.

---

*End of spec. Companion: HARMONY_voice_script_v2.md. Assets: `555` folder.*
