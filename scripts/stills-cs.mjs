// QA stills for the ComingSoon teaser: node scripts/stills-cs.mjs <frames> [scale]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
const frames = (process.argv[2] ?? '60,180,215,330,470').split(',').map(Number);
const scale = Number(process.argv[3] ?? 0.35);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
for (const id of ['ComingSoon-BN-9x16', 'ComingSoon-EN-16x9', 'ComingSoon-BN-4x5']) {
  const composition = await selectComposition({serveUrl, id});
  console.log(id, composition.durationInFrames);
  for (const frame of frames) {
    if (frame >= composition.durationInFrames) continue;
    const output = `out/qa/${id}-${String(frame).padStart(4, '0')}.png`;
    await renderStill({serveUrl, composition, frame, output, scale, imageFormat: 'png'});
  }
}
