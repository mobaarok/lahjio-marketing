// Render the Instagram images: node scripts/render-insta.mjs [filter] [scale]
// Writes out/instagram/<folder>/<name>.png. "filter" matches part of the still id, e.g. "launch" or "day-3".
import {bundle} from '@remotion/bundler';
import {getCompositions, renderStill} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';

const [, , filter = '', scaleArg] = process.argv;
const scale = Number(scaleArg ?? 1);
const serveUrl = await bundle({entryPoint: path.resolve('src/insta/root.tsx')});
const comps = (await getCompositions(serveUrl)).filter((c) => c.id.startsWith('ig--') && c.id.includes(filter));
for (const composition of comps) {
  const rel = composition.id.slice(4).split('--').join('/');
  const output = path.join(scale === 1 ? 'out/instagram' : 'out/qa/instagram', rel + '.png');
  fs.mkdirSync(path.dirname(output), {recursive: true});
  await renderStill({serveUrl, composition, output, scale, imageFormat: 'png'});
  console.log(output);
}
