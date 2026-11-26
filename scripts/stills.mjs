// Usage: node scripts/stills.mjs <compId> <frame,frame,...> [scale]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';

const [, , id, framesArg, scaleArg] = process.argv;
const frames = framesArg.split(',').map(Number);
const scale = Number(scaleArg ?? 0.4);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id});
for (const frame of frames) {
  const output = `out/qa/${id}-${String(frame).padStart(4, '0')}.png`;
  await renderStill({serveUrl, composition, frame, output, scale, imageFormat: 'png'});
  console.log(output);
}
