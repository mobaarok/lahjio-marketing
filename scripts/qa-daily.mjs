// Usage: node scripts/qa-daily.mjs <day> [scale]  → stills of each scene, all sizes, both langs → out/qa/daily/
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
const day = Number(process.argv[2] ?? 1);
const scale = Number(process.argv[3] ?? 0.35);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const {timeline} = await import('./timeline-shim.mjs').catch(() => ({}));
for (const lang of ['BN', 'EN']) for (const fmt of ['9x16', '4x5', '16x9']) {
  const id = `Daily-D${String(day).padStart(2, '0')}-${lang}-${fmt}`;
  const composition = await selectComposition({serveUrl, id});
  const n = composition.durationInFrames;
  const frames = (process.argv[4] ?? '').split(',').filter(Boolean).map(Number);
  const pick = frames.length ? frames : [Math.round(n * 0.1), Math.round(n * 0.27), Math.round(n * 0.5), Math.round(n * 0.72), n - 20];
  for (const frame of pick) {
    const output = `out/qa/daily/${id}-${String(frame).padStart(4, '0')}.png`;
    await renderStill({serveUrl, composition, frame, output, scale, imageFormat: 'png'});
    console.log(output);
  }
}
