// Separate Remotion entry for the Instagram still images (keeps src/index.ts video-only).
// Two sets from the same designs: Bangla account @lahjiobn and English account @lahjioapp.
// Still id "ig--<lang>--<folder>--<name>" renders to out/instagram/<bangla|english>/<folder>/<name>.png (scripts/render-insta.mjs).
import React from 'react';
import {registerRoot, Still} from 'remotion';
import {LAUNCH} from './launch';
import {WEEK1} from './week1';
import {WEEK2} from './week2';
import {MILESTONES, MORE} from './more';
import {GridDay9, GridLaunch, GridWeek, HL, Profile} from './extras';
import {Lang, LangProvider} from './kit';

type S = {id: string; C: React.FC; w: number; h: number};
const FOLDER: Record<Lang, string> = {bn: 'bangla', en: 'english'};

const stillsFor = (lang: Lang): S[] => {
  const id = (path: string) => 'ig--' + FOLDER[lang] + '--' + path.replace(/\//g, '--');
  const list: S[] = [
    {id: id('00-profile/profile-picture'), C: Profile, w: 1080, h: 1080},
    ...HL.map((h) => ({id: id('00-profile/' + h.file), C: h.C, w: 1080, h: 1920})),
    ...LAUNCH.map((p) => ({id: id('01-launch-grid/' + p.file), C: p.C, w: 1080, h: 1350})),
    ...WEEK1.map((p) => ({id: id('02-week-1/' + p.file), C: p.C, w: 1080, h: 1350})),
    {id: id('03-grid-preview/after-launch'), C: GridLaunch, w: 1080, h: 2250},
    {id: id('03-grid-preview/after-week-1'), C: GridWeek, w: 1080, h: 2740},
    {id: id('03-grid-preview/after-day-9'), C: GridDay9, w: 1080, h: 3720},
    ...WEEK2.map((p) => ({id: id('04-week-2/' + p.file), C: p.C, w: 1080, h: 1350})),
    ...MORE.map((p) => ({id: id('05-more-posts/' + p.file), C: p.C, w: 1080, h: 1350})),
    ...MILESTONES.map((p) => ({id: id('06-milestones/' + p.file), C: p.C, w: 1080, h: 1350})),
  ];
  return list.map((s) => {
    const Inner = s.C;
    const Wrapped: React.FC = () => (
      <LangProvider value={lang}>
        <Inner />
      </LangProvider>
    );
    return {...s, C: Wrapped};
  });
};

export const STILLS: S[] = [...stillsFor('bn'), ...stillsFor('en')];

const Root: React.FC = () => (
  <>
    {STILLS.map((s) => (
      <Still key={s.id} id={s.id} component={s.C} width={s.w} height={s.h} />
    ))}
  </>
);

registerRoot(Root);
