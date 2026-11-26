// Loads the brand fonts from public/fonts/ (copies of the Google Fonts files, OFL licence) instead of
// fonts.gstatic.com, so renders work offline and in sandboxes. Same families, weights and unicode ranges
// as @remotion/google-fonts. To add a weight/subset: download it into public/fonts/<Family>-<weight>-<subset>.woff2.
import {continueRender, delayRender, staticFile} from 'remotion';
import {getInfo as bnInfo} from '@remotion/google-fonts/HindSiliguri';
import {getInfo as arInfo} from '@remotion/google-fonts/NotoNaskhArabic';

type Info = {fontFamily: string; unicodeRanges: Record<string, string>};

const load = (info: Info, file: string, weights: string[], subsets: string[]) => {
  if (typeof document === 'undefined') return info.fontFamily;
  for (const w of weights)
    for (const s of subsets) {
      const handle = delayRender(`font ${info.fontFamily} ${w} ${s}`);
      const face = new FontFace(info.fontFamily, `url(${staticFile(`fonts/${file}-${w}-${s}.woff2`)}) format('woff2')`, {
        weight: w,
        style: 'normal',
        unicodeRange: (info.unicodeRanges as Record<string, string>)[s],
      });
      document.fonts.add(face);
      face
        .load()
        .then(() => continueRender(handle))
        .catch((e) => {
          console.error(e);
          continueRender(handle);
        });
    }
  return info.fontFamily;
};

export const FBN = load(bnInfo(), 'HindSiliguri', ['400', '500', '600', '700'], ['bengali', 'latin']);
export const FAR = load(arInfo(), 'NotoNaskhArabic', ['400', '600', '700'], ['arabic']);
