// Separate Remotion entry for the Instagram still images (keeps src/index.ts video-only).
// Still id "ig--<folder>--<name>" renders to out/instagram/<folder>/<name>.png (see scripts/render-insta.mjs).
import React from 'react';
import {registerRoot, Still} from 'remotion';
import {LAUNCH} from './launch';
import {WEEK1} from './week1';
import {GridLaunch, GridWeek, HL, Profile} from './extras';

type S = {id: string; C: React.FC; w: number; h: number};
const id = (path: string) => 'ig--' + path.replace(/\//g, '--');

export const STILLS: S[] = [
  {id: id('00-profile/profile-picture'), C: Profile, w: 1080, h: 1080},
  ...HL.map((h) => ({id: id('00-profile/' + h.file), C: h.C, w: 1080, h: 1920})),
  ...LAUNCH.map((p) => ({id: id('01-launch-grid/' + p.file), C: p.C, w: 1080, h: 1350})),
  ...WEEK1.map((p) => ({id: id('02-week-1/' + p.file), C: p.C, w: 1080, h: 1350})),
  {id: id('03-grid-preview/after-launch'), C: GridLaunch, w: 1080, h: 2250},
  {id: id('03-grid-preview/after-week-1'), C: GridWeek, w: 1080, h: 2740},
];

const Root: React.FC = () => (
  <>
    {STILLS.map((s) => (
      <Still key={s.id} id={s.id} component={s.C} width={s.w} height={s.h} />
    ))}
  </>
);

registerRoot(Root);
