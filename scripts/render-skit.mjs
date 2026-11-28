// Renders the "Funny mistakes" skits into their own folder:
//   out/skits/skit-01-yabgha-abgha/bangla/TikTok-Reels-Shorts_9x16.mp4 ...
//   out/skits/skit-01-yabgha-abgha/english/...
// Usage: node scripts/render-skit.mjs           (all dialogues)
//        node scripts/render-skit.mjs 1 [--lang=EN]
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';

const SLUGS = {1: 'yabgha-abgha'};
// optional: --lang=EN or --lang=BN to render one language only
const args = process.argv.slice(2);
const langArg = args.find((a) => a.startsWith('--lang='))?.slice(7).toUpperCase();
const days = args.filter((a) => !a.startsWith('--')).map(Number);
const todo = days.length ? days : Object.keys(SLUGS).map(Number);

// file name = where to post it
const OUTPUTS = [
  {fmt: '9x16', bgm: true, name: 'TikTok-Reels-Shorts_9x16'},
  {fmt: '9x16', bgm: false, name: 'TikTok_9x16_noMusic'},
  {fmt: '4x5', bgm: true, name: 'Instagram-Facebook-Feed_4x5'},
  {fmt: '16x9', bgm: true, name: 'YouTube-Facebook_16x9'},
];

// optional: REMOTION_BROWSER=/path/to/chrome-headless-shell (e.g. in a cloud container with no download access)
const browserExecutable = process.env.REMOTION_BROWSER ?? null;
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
for (const day of todo) {
  const dd = String(day).padStart(2, '0');
  for (const [lang, folder] of [['BN', 'bangla'], ['EN', 'english']].filter(([l]) => !langArg || l === langArg)) {
    const dir = `out/skits/skit-${dd}-${SLUGS[day]}/${folder}`;
    fs.mkdirSync(dir, {recursive: true});
    for (const o of OUTPUTS) {
      const id = `Skit-D${dd}-${lang}-${o.fmt}`;
      const inputProps = {id: day, lang: lang.toLowerCase(), bgm: o.bgm};
      const composition = await selectComposition({serveUrl, id, inputProps, browserExecutable});
      const outputLocation = `${dir}/${o.name}.mp4`;
      const t0 = Date.now();
      await renderMedia({serveUrl, composition, codec: "h264", crf: 18, outputLocation, inputProps, browserExecutable});
      console.log(`${outputLocation}  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
    }
  }
}
console.log('DONE');
