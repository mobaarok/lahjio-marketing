// Usage: node scripts/render-global.mjs [--lang=EN|BN|ALL]  (default EN)
//   EN → out/global-english/*.mp4, BN → out/global-bangla/*.mp4 (music + noMusic, 9:16 + 16:9)
import {execSync} from 'node:child_process';
const arg = (process.argv.find((a) => a.startsWith('--lang=')) ?? '--lang=EN').slice(7).toUpperCase();
const langs = arg === 'ALL' ? ['EN', 'BN'] : [arg];
const dirs = {EN: 'out/global-english', BN: 'out/global-bangla'};
for (const L of langs) {
  const jobs = [
    [`Global-${L}-9x16`, 'TikTok-Reels-Shorts_9x16', ''],
    [`Global-${L}-9x16`, 'TikTok_9x16_noMusic', '--props=props-nobgm.json'],
    [`Global-${L}-16x9`, 'YouTube-Facebook_16x9', ''],
    [`Global-${L}-16x9`, 'YouTube_16x9_noMusic', '--props=props-nobgm.json'],
  ];
  for (const [id, name, extra] of jobs) {
    execSync(`npx remotion render src/index.ts ${id} ${dirs[L]}/${name}.mp4 --codec=h264 --crf=18 ${extra}`, {stdio: 'inherit'});
  }
}
