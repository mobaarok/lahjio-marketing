// Usage: node scripts/qa-dialog.mjs <id> [scale] [fractions]  → stills, all sizes, both langs → out/qa/dialog/
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
const id = Number(process.argv[2] ?? 1);
const scale = Number(process.argv[3] ?? 0.35);
const fr = (process.argv[4] ?? '0.06,0.25,0.5,0.74,0.95').split(',').map(Number);
const only = process.argv[5]; // optional filter, e.g. BN-9x16
const browserExecutable = process.env.REMOTION_BROWSER ?? null;
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
for (const lang of ['BN', 'EN']) for (const fmt of ['9x16', '4x5', '16x9']) {
  const cid = `Dialog-D${String(id).padStart(2, '0')}-${lang}-${fmt}`;
  if (only && !cid.includes(only)) continue;
  const composition = await selectComposition({serveUrl, id: cid, browserExecutable});
  const n = composition.durationInFrames;
  console.log(cid, n, (n / 30).toFixed(1) + 's');
  for (const x of fr) {
    const frame = x < 1 ? Math.round(n * x) : x;
    const output = `out/qa/dialog/${cid}-${String(frame).padStart(4, '0')}.png`;
    await renderStill({serveUrl, composition, frame, output, scale, imageFormat: 'png', browserExecutable});
  }
}
