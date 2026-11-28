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
- Day 8 (ما في مشكلة, "No problem") starts week 2: Drive folder "Lahjio Daily Phrases – Week 2" (https://drive.google.com/drive/folders/1ItMjri7SYSBVWJzBQiVajgdb_HgnmFOT). Folder ids per day in `out/daily/.drive-folders.json`.

## "Android app coming soon" teaser (made 2026-11-26)
- Code: `src/videos/ComingSoon.tsx` (scenes hook "big news" → phone with app home + "coming soon" stamp → Google Play
  badge + loading bar + lahjio.com → logo outro with يلا نبدأ). Timing is computed from narrator clip lengths (`CS_VO`).
- Compositions `ComingSoon-{BN,EN}-{9x16,4x5,16x9}`. Narrator clips: `public/audio/{bn,en}/cs-hook.mp3`, `cs-play.mp3`.
- QA: `node scripts/stills-cs.mjs <frames> [scale]` · render: `node scripts/render-coming-soon.mjs` → `out/coming-soon/{bangla,english}/` (+ `POSTING.md`).
- Google Drive: folder "Lahjio Android App – Coming Soon" (https://drive.google.com/drive/folders/1DHrmB9viPE2c4wy2h2RksxfQ0pT3etk1) with `Bangla/` and `English/` subfolders + captions txt. Other Drive folders: "Lahjio Promo Videos", "Lahjio Daily Phrases – Week 1". Upload with the Drive connector `create_file` (base64Content as a sha256 file reference).
- The app is not on Play yet; when it launches, make a "now available" version (change badge text to "GET IT ON").

## "Learn Saudi Arabic in English" (made 2026-11-26)
- For English speakers anywhere (Philippines/India/UK/USA). **English only** (user asked), so no BN version. lahjio.com
  has an EN/हि/اُر/বাং language switch; lessons for English speakers exist.
- Code: `src/videos/Global.tsx` (+ text in `src/videos/GlobalCopy.ts`). Scenes: hook (plane, Riyadh/Jeddah/Dammam) →
  city cards with SVG flags (flag emoji don't render on Windows) → "not textbook Arabic" → reused `Quiz` → `Life` →
  `Habit` → website + phone ("Add to Home screen", it is a web app) → reused `Outro`. Timing is computed from clip lengths (`G_VO`).
- `Quiz` and `Life` in `scenes.tsx` now take optional `audioAt` / `tapAt` props (defaults keep promo #1 unchanged).
- Narrator: ElevenLabs **"Sarah – Warm & Conversational"** (American female) `voice_id: h1Q2hoJVsQ8dXy9QYQN5`, eleven_v4,
  clips `public/audio/global/l1..l8-*.mp3` (~50–130 credits each).
- Compositions `Global-EN-{9x16,16x9}` (4:5 dropped: the reused Life cards overlap the title at 1350px).
  Render: `node scripts/render-global.mjs` → `out/global-english/` (+ `POSTING.md`).
- Google Drive: folder "Lahjio – Learn Saudi Arabic in English" (https://drive.google.com/drive/folders/11AqxshuG738LiJtBhB35_wEU2nZdgGL-).
  **The Drive connector refuses files over 10 MB.** The ~16 MB renders were re-encoded for Drive into `out/global-english/drive/`
  (`libx264 -preset slow -crf 25 -maxrate 1.15M -bufsize 2.3M`, AAC 128k → ~6 MB, still sharp). Full-quality originals stay local.
- **From a cloud session the Drive upload limit is ~3.1 MB per call.** Shrink with two-pass x264 to ~2.85 MB (AAC 96k, bitrate from duration) into
  `out/drive-small/` before uploading. Done for day 8 and the fixed English promo (2026-11-26).

## "Mini dialogue" series (started 2026-11-28)
- A real-life chat between a Saudi ("them") and the viewer ("you", the Bangladeshi worker), played 3 times:
  round 1 just listen (Arabic only) → round 2 with transliteration + meaning → round 3 "your turn": the "you" lines are
  silent pauses with a mic badge and a countdown bar (the viewer speaks). Hook question → rounds → reused Daily `Outro`.
- Code: `src/videos/dialogs.ts` (data: lines, clip lengths, UI text `DUI`) and `src/videos/Dialogue.tsx` (timing computed
  from clip lengths in `dlgTimeline`; flat SVG avatars `Person` kinds `saudi` (ghutra) / `shop` (green cap + polo); layout anchors per format in `L`).
- Voices: "them" = Abdulrahman `KfYUTAF49N2CPU3iKuMi`; "you" = **"Fahad - Saudi Professional & Warm"** `YCN2uLvOoKxKJtRmeub3` (a second Saudi
  voice so the two speakers sound different). Clips `public/audio/dialog/d{N}-l{i}.mp3`. Hook narration `public/audio/{bn,en}/dlg{N}-hook.mp3`
  (Shadhin / Leo); round 3 reuses `your-turn.mp3`, outro reuses `outro.mp3`.
- Compositions `Dialog-D{NN}-{BN,EN}-{9x16,4x5,16x9}`. QA: `node scripts/qa-dialog.mjs <id> [scale] [fractions|frames] [filter]` → `out/qa/dialog/`.
  Render: `node scripts/render-dialog.mjs [ids] [--lang=EN]` → `out/dialogs/dialog-NN-<slug>/{bangla,english}/` (+ `out/dialogs/POSTING.md`).
- #1 `shop-water` (at the shop, 4 lines: السلام عليكم، عندك موية؟ / وعليكم السلام، إيه موجود / بكم؟ / بريالين), ~36 s.
  4 lines is the most that fits: 3 rounds make it ~36 s, and in 16:9 the 4th bubble just fits (chat `k` 0.84).
- To add #2: generate clips (1 take each), measure with ffprobe, add a `DIALOGS` entry and a `SLUGS` entry in `render-dialog.mjs`.

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
- **Fonts are local** (`src/fonts.ts` loads `public/fonts/*.woff2`, copies of the Google Fonts files): no font download at render time.
- **Cloud sessions:** use the personal environment "lahjio-marketing" (allows `elevenlabsusercontent.com` for clip downloads). Run `npm ci` first. Remotion can't download its Chrome there, so set
  `REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell` (read by `qa-daily.mjs` / `render-daily.mjs`).
- ffmpeg/ffprobe: system FFmpeg 9.1 full build installed 2026-11-28 (`winget install Gyan.FFmpeg`, has the `tile` filter; open a new terminal for PATH). `npx remotion ffmpeg` / `npx remotion ffprobe` still work (that build has no `tile`). There is also no Python on this machine.

## Lessons from video #1
- Check stills of both layouts (vertical BN and horizontal EN) before the final render. Long Bengali text overflows narrow vertical cards.
- When Arabic text sits next to a red "?" badge, don't also add `؟` (it shows twice).
- The tapping finger position in `Quiz` is set by hand from the phone's own coordinates (option 1 centre ≈ y 464 × zoom). Re-check it if the phone layout changes.
- Keep text big: captions ≥ ~5% of frame height. Let brand and CTA moments stay on screen ≥ 1s.
- The video-shotcraft skill (Remotion shot recipes + SFX library) was used for method, SFX and BGM. Some SFX (`whoosh-big`, `riser-cine`, `sparkle`, `pop`) have no traceable license source.

## Git
- Repo: https://github.com/mobaarok/lahjio-marketing (branch `main`). Commit code, audio, and posting notes; rendered `*.mp4`, QA stills and logs are git-ignored (videos go to Google Drive).
- **Claude pushes, not the user (user asked 2026-11-26: "you do"):** at the end of every Lahjio task (new video, new audio, caption changes), run `git add -A; git commit; git push` yourself. Never commit `*.mp4` (videos go to Google Drive). Do not commit another session's half-finished edits; push once the work is done.

## Thumbnails and Reel covers (2026-11-26)
- `src/thumbs/root.tsx` (own entry): `yt--promo1-{en,bn}` (1280×720 YouTube) and `reel--promo1-{en,bn}` (1080×1920 Reel cover; key content inside y 240–1680 for the 3:4 grid crop).
- Render: `node scripts/render-thumbs.mjs [filter]` → `out/thumbnails/*.jpg` (+ png). On Drive in "Lahjio Promo Videos" as `Thumbnail-YouTube-Bangla.jpg`, `ReelCover-{English,Bangla}.jpg`.

## Instagram images (made 2026-11-26)
- **Two accounts:** Bangla = **@lahjiobn**, English = **@lahjioapp** (user corrected this; don't swap them). Same designs, text per language.
- Remotion stills in `src/insta/` with their own entry `src/insta/root.tsx` (not in `src/index.ts`). `kit.tsx` = frame/header/footer, icons, cards,
  language context (`useT()('বাংলা', 'English')`, `HANDLE`, `useNum` for Bengali digits); `launch.tsx` = 9-post launch grid; `week1.tsx` = week-1 posts (Day 1 carousel);
  `week2.tsx` = days 8+ (folder `04-week-2/`, same topics as the daily Reels, keep alternating green/light); `extras.tsx` = profile pic, highlight covers, grid previews (`after-day-9` = all 18 posts). No language toggle is shown on the images (user: "no need to add language switch").
- Render: `node scripts/render-insta.mjs [filter] [scale]` → `out/instagram/{bangla,english}/<folder>/<name>.png` (still id `ig--<bangla|english>--folder--name`).
  Captions/bio/order: `out/instagram/{bangla,english}/POSTING-PLAN.md`.
- Google Drive: "Lahjio Instagram – Bangla (@lahjiobn)" https://drive.google.com/drive/folders/1KNUTXeaUbqtd_rZjwRh7BtKKyjqTBj9w and
  "Lahjio Instagram – English (@lahjioapp)" https://drive.google.com/drive/folders/1Mj19smZYKyyysKea5Nu1r4ca9VhdMMOf. The Drive connector can't replace a file's content: re-upload and trash the old one.
- Feed 1080×1350; the grid crops to 3:4, so keep content in the centre ~1000px. Posts alternate green/light so the grid is a checkerboard: keep alternating for new posts.
- Avoid emoji in images (use SVG icons). Watch Bengali double meanings (e.g. غالي "gali" reads as an insult).
