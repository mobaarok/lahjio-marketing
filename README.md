# Lahjio marketing

Remotion project for Lahjio (https://lahjio.com) promo and social videos: the main promo, the daily
"Saudi phrase of the day" series and the "Android app coming soon" teaser, in Bengali and English.

- Code: `src/` (compositions in `src/index.ts`), render/QA scripts in `scripts/`
- Assets: `public/` (logo, ElevenLabs narration and Saudi word audio, SFX, music)
- Captions and posting notes: `POSTING-KIT.md`, `out/daily/POSTING-SCHEDULE.md`, `out/coming-soon/POSTING.md`
- Full notes (brand, voices, preferences, commands): `CLAUDE.md`

Rendered videos (`*.mp4`) are not kept in git; they are stored on Google Drive.

```
npm install
npm run dev                          # Remotion Studio
node scripts/render-daily.mjs 1 2    # render daily videos into out/daily/
```
