// Renders the "Android app coming soon" teaser into out/coming-soon/{bangla,english}/
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';
const OUTPUTS = [
  {fmt: '9x16', bgm: true, name: 'TikTok-Reels-Shorts_9x16'},
  {fmt: '9x16', bgm: false, name: 'TikTok_9x16_noMusic'},
  {fmt: '4x5', bgm: true, name: 'Instagram-Facebook-Feed_4x5'},
  {fmt: '16x9', bgm: true, name: 'YouTube-Facebook_16x9'},
];
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
for (const [lang, folder] of [['BN', 'bangla'], ['EN', 'english']]) {
  const dir = `out/coming-soon/${folder}`;
  fs.mkdirSync(dir, {recursive: true});
  for (const o of OUTPUTS) {
    const id = `ComingSoon-${lang}-${o.fmt}`;
    const inputProps = {lang: lang.toLowerCase(), bgm: o.bgm};
    const composition = await selectComposition({serveUrl, id, inputProps});
    const outputLocation = `${dir}/${o.name}.mp4`;
    await renderMedia({serveUrl, composition, codec: 'h264', crf: 18, outputLocation, inputProps});
    console.log(outputLocation);
  }
}
console.log('DONE');
