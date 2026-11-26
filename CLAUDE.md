# Lahjio video project: notes for Claude

Lahjio (https://lahjio.com) is the user's startup. It teaches **Saudi (Gulf) Arabic to Bengali speakers**, mainly
Bangladeshi expats working in Saudi Arabia (shops, taxis, work). The app UI is in Bengali. Its features are short audio
lessons, flashcards and quizzes, smart review (spaced repetition), and daily goal / XP / streaks. It is free to start.

This folder is a **Remotion** project for promo and feature videos posted on Instagram, TikTok, YouTube and Facebook.
The user will keep asking for new videos (e.g. one per feature). Reuse this project; don't start from scratch.

## Facts from the site (keep accurate)
- 773+ words and phrases · 72 lessons · 3 quiz types · "5 minutes a day" · every word has audio
- Hero tagline: "আত্মবিশ্বাসের সাথে বলো সৌদি আরবি" · CTA: "ফ্রি শুরু করো" · closing line: "يلا نبدأ / আজই আরবি বলা শুরু করো"
- Example phrases on the site: كم السعر (দাম কত?), وين (কোথায়?), أبغى (আমি চাই), كيف حالك (কেমন আছেন?), شكراً (ধন্যবাদ)
- Re-check lahjio.com before quoting new numbers; they change.

## Brand tokens (from lahjio.com computed styles, in `src/theme.ts`)
- Background: slate-50 `#f8fafc` · text: `#0f172a` / body `#334155` / muted `#64748b` · lines `#e2e8f0`
- Primary green `#059669` (dark `#047857`) → teal `#14b8a6` gradient (used on key words and cards)
- Logo: green rounded square with a white "J" and mint `#bbf7d0` sound waves (`public/logo.svg`, animated `<Logo>` in `src/parts.tsx`)
- Fonts: **Hind Siliguri** (Bengali + Latin), **Noto Naskh Arabic** (Arabic), loaded through `@remotion/google-fonts`
- Motion style: friendly and playful. Pop easing `bezier(0.34,1.56,0.64,1)`, ease-out `bezier(0.16,1,0.3,1)`. Clean, light, Duolingo-like, no dark or techy look.

## User preferences (decided 2026-11-26)
- Make **Bengali and English** versions of every video.
- Formats: **9:16** (Reels/TikTok/Shorts) and **16:9** (YouTube/Facebook). 4:5 is not made yet; it was offered as an option.
- Promo #1 had no narrator. For the daily series the user asked for a **Bangladeshi Bengali ElevenLabs voice** (see Daily series). Always keep big on-screen captions. Real **Saudi Arabic pronunciation clips** from ElevenLabs are welcome.
- Always render a **music** and a **noMusic** version (`--props=props-nobgm.json`).
- The user wants Claude to decide the creative direction and deliver finished videos ("you decide all") instead of approving each step.
- The user has the **ElevenLabs** connector. Use it for Arabic word audio; it costs about 5–9 credits per short clip. Generate 1 take each.

## Daily series: "Saudi phrase of the day" (started 2026-11-26)
- Code: `src/daily/phrases.ts` (one entry per day: text, transliteration, word parts, clip lengths) and `src/daily/Daily.tsx`
  (scenes hook → Arabic card → meaning + word parts → "your turn" replay → follow/CTA; timing is computed from clip lengths).
- Compositions `Daily-D{NN}-{BN,EN}-{9x16,4x5,16x9}` in `src/index.ts`. QA: `node scripts/qa-daily.mjs <day> 0.35 [frames]`.
- Render: `node scripts/render-daily.mjs [days...]` → **videos only** go to `out/daily/day-NN-<slug>/{bangla,english}/`,
  named by platform: `TikTok-Reels-Shorts_9x16`, `TikTok_9x16_noMusic`, `Instagram-Facebook-Feed_4x5`, `YouTube-Facebook_16x9`.
  Code stays in this project (user: "video only separate folder, tools in same").
- Captions per day: `out/daily/POSTING-SCHEDULE.md`. To add day 8+: generate clips, measure with ffprobe, add a `PHRASES` entry and a `SLUGS` entry in the render script.
- **Bengali narrator (user asked 2026-11-26):** ElevenLabs "Shadhin Bangla" (Bangladeshi male) `voice_id: OHhJ32z5ulznaiTfV1cI`, eleven_v4.
  Used in BN versions (hook line, meaning line, shared `bn/your-turn.mp3` and `bn/outro.mp3`).
- **English narrator (user asked 2026-11-26):** ElevenLabs "Leo — Clear & Natural Narrator" (South Asian English accent)
  `voice_id: YHpqahXF7GW5T7hG65Yd`, eleven_v4. Same structure in `public/audio/en/`; lengths in `EN_VO` in `phrases.ts`.
  Render one language with `node scripts/render-daily.mjs [days] --lang=EN`.
  Bengali lines cost ~30–65 credits each. Files: `public/audio/bn/d{N}-hook.mp3`, `d{N}-mean.mp3`.
- Separate Bangla and English videos; one file per platform (incl. 4:5 feed).

## "Android app coming soon" teaser (made 2026-11-26)
- Code: `src/videos/ComingSoon.tsx` (scenes hook "big news" → phone with app home + "coming soon" stamp → Google Play
  badge + loading bar + lahjio.com → logo outro with يلا نبدأ). Timing is computed from narrator clip lengths (`CS_VO`).
- Compositions `ComingSoon-{BN,EN}-{9x16,4x5,16x9}`. Narrator clips: `public/audio/{bn,en}/cs-hook.mp3`, `cs-play.mp3`.
- QA: `node scripts/stills-cs.mjs <frames> [scale]` · render: `node scripts/render-coming-soon.mjs` → `out/coming-soon/{bangla,english}/` (+ `POSTING.md`).
- The app is not on Play yet; when it launches, make a "now available" version (change badge text to "GET IT ON").

## ElevenLabs
- Voice: **Abdulrahman - Warm, Clear, Commercial** (native Saudi male) `voice_id: KfYUTAF49N2CPU3iKuMi`, model `eleven_v4`
- Flow: "Lahjio promo – Saudi word audio" `HNNLSVvbW8DjC6zBnO86` (add new clips to this flow)
- Download the clip with `creative_get_generations` → `full_res_url` → curl into `public/audio/<name>.mp3`
- Existing clips: `kam-assir.mp3` (كم السعر), `shukran.mp3` (شكراً, unused so far), `kef-halak.mp3` (كيف حالك), `yalla.mp3` (يلا نبدأ)

## Project layout
- `src/copy.ts`: all text for each language (`COPY.bn` / `COPY.en`). Add new strings here.
- `src/theme.ts`: colors, fonts, easing helpers (`ease`, `pop`, `exitOf`), `num()` for Bengali digits, seeded `mulberry32`
- `src/parts.tsx`: `useLayout()` (V = vertical, s = scale unit), `Background`, `Logo`, `PhoneQuiz` (copy of the app's quiz screen), `Speaker`, `Wave`, `Check`, `ArText`, `GradText`
- `src/scenes.tsx`: scenes Hook, Brand, Quiz, Life (phrase cards), Habit (streak/XP/goal), Outro (CTA)
- `src/Main.tsx`: `SHOTS` timing table (one place for all timing), `VOICE` clips, `SFX` table (timed relative to `SHOTS`), BGM with ducking under the voice
- `src/index.ts`: compositions `Lahjio-{BN,EN}-{9x16,16x9}`, ~32s, 30fps, props `{lang, bgm}`
- `public/sfx`, `public/bgm` (Mixkit; current BGM is `house-vibez.mp3`), `public/audio` (ElevenLabs)
- `POSTING-KIT.md`: captions, hashtags, which file goes where, licenses

For a **new feature video**, add a new `Main` (e.g. `src/videos/<Feature>.tsx`) with its own `SHOTS` and register new
composition ids. Reuse `Background`, `Logo`, the Outro CTA and the brand tokens so the series looks consistent.

## Commands
- Preview: `npm run dev` (Remotion Studio)
- QA stills (bundles once): `node scripts/stills.mjs Lahjio-BN-9x16 90,354,746 0.4` → `out/qa/`
- Render: `npx remotion render src/index.ts <id> out/final/<id>.mp4 --codec=h264 --crf=18`
- No-music version: add `--props=props-nobgm.json`
- ffmpeg/ffprobe: run through `npx remotion ffmpeg` / `npx remotion ffprobe` (there is no system ffmpeg; its build has no `tile` filter, so look at frames one by one). There is also no Python on this machine.

## Lessons from video #1
- Check stills of both layouts (vertical BN and horizontal EN) before the final render. Long Bengali text overflows narrow vertical cards.
- When Arabic text sits next to a red "?" badge, don't also add `؟` (it shows twice).
- The tapping finger position in `Quiz` is set by hand from the phone's own coordinates (option 1 centre ≈ y 464 × zoom). Re-check it if the phone layout changes.
- Keep text big: captions ≥ ~5% of frame height. Let brand and CTA moments stay on screen ≥ 1s.
- The video-shotcraft skill (Remotion shot recipes + SFX library) was used for method, SFX and BGM. Some SFX (`whoosh-big`, `riser-cine`, `sparkle`, `pop`) have no traceable license source.

## Git
- Repo: https://github.com/mobaarok/lahjio-marketing (branch `main`). Commit code, audio, and posting notes; rendered `*.mp4`, QA stills and logs are git-ignored (videos go to Google Drive).
- **Claude pushes, not the user (user asked 2026-11-26: "you do"):** at the end of every Lahjio task (new video, new audio, caption changes), run `git add -A; git commit; git push` yourself. Never commit `*.mp4` (videos go to Google Drive). Do not commit another session's half-finished edits; push once the work is done.
