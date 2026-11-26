// Render YouTube thumbnails: node scripts/render-thumbs.mjs [filter]
// Writes out/thumbnails/<name>.png and <name>.jpg (JPG stays under YouTube's 2 MB limit).
import {bundle} from '@remotion/bundler';
import {getCompositions, renderStill} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';

const [, , filter = ''] = process.argv;
const serveUrl = await bundle({entryPoint: path.resolve('src/thumbs/root.tsx')});
const comps = (await getCompositions(serveUrl)).filter((c) => c.id.startsWith('yt--') && c.id.includes(filter));
fs.mkdirSync('out/thumbnails', {recursive: true});
for (const composition of comps) {
  const name = composition.id.slice(4);
  for (const fmt of ['png', 'jpeg']) {
    const output = path.join('out/thumbnails', name + (fmt === 'png' ? '.png' : '.jpg'));
    await renderStill({serveUrl, composition, output, imageFormat: fmt, ...(fmt === 'jpeg' ? {jpegQuality: 92} : {})});
    console.log(output, Math.round(fs.statSync(output).size / 1024) + ' KB');
  }
}
