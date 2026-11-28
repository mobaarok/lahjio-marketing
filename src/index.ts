import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Main, MainProps, TOTAL} from './Main';
import {Daily, DailyProps, timeline} from './daily/Daily';
import {PHRASES} from './daily/phrases';
import {ComingSoon, ComingSoonProps, csTimeline} from './videos/ComingSoon';
import {Global, GlobalProps, gTimeline} from './videos/Global';
import {Dialogue, DialogueProps, dlgTimeline} from './videos/Dialogue';
import {DIALOGS} from './videos/dialogs';
import {Skit, SkitProps, skitTimeline} from './videos/Skit';
import {SKITS} from './videos/skits';

const FORMATS = [
  {id: 'Lahjio-BN-9x16', lang: 'bn', w: 1080, h: 1920},
  {id: 'Lahjio-BN-16x9', lang: 'bn', w: 1920, h: 1080},
  {id: 'Lahjio-EN-9x16', lang: 'en', w: 1080, h: 1920},
  {id: 'Lahjio-EN-16x9', lang: 'en', w: 1920, h: 1080},
] as const;

// Daily "Saudi phrase of the day" series: Daily-D01-BN-9x16, Daily-D01-EN-4x5, ...
export const DAILY_SIZES = [
  {fmt: '9x16', w: 1080, h: 1920},
  {fmt: '4x5', w: 1080, h: 1350},
  {fmt: '16x9', w: 1920, h: 1080},
] as const;

const Root: React.FC = () =>
  React.createElement(
    React.Fragment,
    null,
    FORMATS.map((c) =>
      React.createElement(Composition<any, MainProps>, {
        key: c.id,
        id: c.id,
        component: Main,
        durationInFrames: TOTAL,
        fps: 30,
        width: c.w,
        height: c.h,
        defaultProps: {lang: c.lang, bgm: true},
      }),
    ),
    PHRASES.flatMap((p) =>
      (['bn', 'en'] as const).flatMap((lang) =>
        DAILY_SIZES.map((z) => {
          const id = `Daily-D${String(p.day).padStart(2, '0')}-${lang.toUpperCase()}-${z.fmt}`;
          return React.createElement(Composition<any, DailyProps>, {
            key: id,
            id,
            component: Daily,
            durationInFrames: timeline(p, lang).total,
            fps: 30,
            width: z.w,
            height: z.h,
            defaultProps: {day: p.day, lang, bgm: true},
          });
        }),
      ),
    ),
    // "Android app coming soon" teaser: ComingSoon-BN-9x16, ...
    (["bn", "en"] as const).flatMap((lang) =>
      DAILY_SIZES.map((z) => {
        const id = `ComingSoon-${lang.toUpperCase()}-${z.fmt}`;
        return React.createElement(Composition<any, ComingSoonProps>, {
          key: id, id, component: ComingSoon, durationInFrames: csTimeline(lang).total,
          fps: 30, width: z.w, height: z.h, defaultProps: {lang, bgm: true},
        });
      }),
    ),
    // "Learn Saudi Arabic" global video: Global-EN-9x16 (English speakers worldwide), Global-BN-9x16 (Bengali speakers), 16x9
    (['en', 'bn'] as const).flatMap((lang) =>
      DAILY_SIZES.filter((z) => z.fmt !== '4x5').map((z) => {
        const id = `Global-${lang.toUpperCase()}-${z.fmt}`;
        return React.createElement(Composition<any, GlobalProps>, {
          key: id, id, component: Global, durationInFrames: gTimeline(lang).total,
          fps: 30, width: z.w, height: z.h, defaultProps: {bgm: true, lang},
        });
      }),
    ),
    // "Mini dialogue" series: Dialog-D01-BN-9x16, ...
    DIALOGS.flatMap((d) =>
      (['bn', 'en'] as const).flatMap((lang) =>
        DAILY_SIZES.map((z) => {
          const id = `Dialog-D${String(d.id).padStart(2, '0')}-${lang.toUpperCase()}-${z.fmt}`;
          return React.createElement(Composition<any, DialogueProps>, {
            key: id, id, component: Dialogue, durationInFrames: dlgTimeline(d, lang).total,
            fps: 30, width: z.w, height: z.h, defaultProps: {id: d.id, lang, bgm: true},
          });
        }),
      ),
    ),
    // "Funny mistakes" skits: Skit-D01-BN-9x16, ...
    SKITS.flatMap((k) =>
      (['bn', 'en'] as const).flatMap((lang) =>
        DAILY_SIZES.map((z) => {
          const id = `Skit-D${String(k.id).padStart(2, '0')}-${lang.toUpperCase()}-${z.fmt}`;
          return React.createElement(Composition<any, SkitProps>, {
            key: id, id, component: Skit, durationInFrames: skitTimeline(k, lang).total,
            fps: 30, width: z.w, height: z.h, defaultProps: {id: k.id, lang, bgm: true},
          });
        }),
      ),
    ),
  );

registerRoot(Root);
