// Usage: node scripts/render-global.mjs  → out/global-english/*.mp4 (music + noMusic, 9:16 + 16:9)
import {execSync} from 'node:child_process';
const jobs = [
  ['Global-EN-9x16', 'TikTok-Reels-Shorts_9x16', ''],
  ['Global-EN-9x16', 'TikTok_9x16_noMusic', '--props=props-nobgm.json'],
  ['Global-EN-16x9', 'YouTube-Facebook_16x9', ''],
  ['Global-EN-16x9', 'YouTube_16x9_noMusic', '--props=props-nobgm.json'],
];
for (const [id, name, extra] of jobs) {
  execSync(`npx remotion render src/index.ts ${id} out/global-english/${name}.mp4 --codec=h264 --crf=18 ${extra}`, {stdio: 'inherit'});
}
