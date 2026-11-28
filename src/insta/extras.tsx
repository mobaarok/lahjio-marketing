// Profile picture, story-highlight covers and profile-grid previews for @lahjioapp.
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FBN} from '../theme';
import {Logo} from '../parts';
import {GREEN_BG, HANDLE, Icon, useLang, useT} from './kit';
import {LAUNCH} from './launch';
import {WEEK1} from './week1';
import {WEEK2} from './week2';

// Profile picture 1080 x 1080. Instagram crops it to a circle, so the mark sits well inside.
export const Profile: React.FC = () => (
  <AbsoluteFill style={{background: GREEN_BG, alignItems: 'center', justifyContent: 'center'}}>
    <svg width={700} height={700} viewBox="0 0 200 200">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 -6)">
        <path d="M96 40 V112 C96 138 81 150 63 150 C48 150 40 141 40 128" stroke="#fff" strokeWidth="22" />
        <path d="M126 68 Q141 86 126 104" stroke={C.mint} strokeWidth="9" />
        <path d="M144 52 Q170 86 144 120" stroke={C.mint} strokeWidth="9" />
      </g>
    </svg>
  </AbsoluteFill>
);

// Highlight cover 1080 x 1920: only the centre circle shows on the profile.
const Highlight: React.FC<{icon: string}> = ({icon}) => (
  <AbsoluteFill style={{background: GREEN_BG, alignItems: 'center', justifyContent: 'center'}}>
    <div style={{width: 640, height: 640, borderRadius: 640, background: 'rgba(255,255,255,0.14)', border: '6px solid rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name={icon} size={340} color="#fff" stroke={1.7} />
    </div>
  </AbsoluteFill>
);
export const HL = [
  {file: 'highlight-1-start', icon: 'sparkle', label: 'শুরু', en: 'Start'},
  {file: 'highlight-2-phrases', icon: 'chat', label: 'বাক্য', en: 'Phrases'},
  {file: 'highlight-3-quiz', icon: 'question', label: 'কুইজ', en: 'Quiz'},
  {file: 'highlight-4-tips', icon: 'bulb', label: 'টিপস', en: 'Tips'},
  {file: 'highlight-5-app', icon: 'phone', label: 'অ্যাপ', en: 'App'},
].map((h) => ({...h, C: () => <Highlight icon={h.icon} />}));

// Profile mock-up with the grid (newest post top-left), so the user can see the finished look.
const Thumb: React.FC<{C: React.FC; w: number}> = ({C: P, w}) => {
  const h = (w * 4) / 3; // grid thumbnails are 3:4
  const k = h / 1350;
  return (
    <div style={{width: w, height: h, overflow: 'hidden', position: 'relative', background: '#eee'}}>
      <div style={{position: 'absolute', width: 1080, height: 1350, left: (w - 1080 * k) / 2, top: 0, transform: `scale(${k})`, transformOrigin: '0 0'}}>
        <P />
      </div>
    </div>
  );
};

const GridPreview: React.FC<{posts: React.FC[]}> = ({posts}) => {
  const w = (1080 - 4) / 3;
  const t = useT();
  const lang = useLang();
  return (
    <AbsoluteFill style={{background: '#fff', fontFamily: FBN, color: '#000'}}>
      <div style={{padding: '50px 44px 26px'}}>
        <div style={{fontSize: 46, fontWeight: 700}}>{HANDLE[lang].slice(1)}</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 60, marginTop: 30}}>
          <div style={{width: 200, height: 200, borderRadius: 200, overflow: 'hidden', flexShrink: 0, boxShadow: '0 0 0 6px #fff, 0 0 0 9px #e5e7eb'}}>
            <div style={{width: 1080, height: 1080, transform: 'scale(0.1852)', transformOrigin: '0 0'}}>
              <Profile />
            </div>
          </div>
          {[
            [String(posts.length), 'posts'],
            ['0', 'followers'],
            ['0', 'following'],
          ].map(([n, l]) => (
            <div key={l} style={{textAlign: 'center'}}>
              <div style={{fontSize: 44, fontWeight: 700}}>{n}</div>
              <div style={{fontSize: 30}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize: 32, lineHeight: 1.4, marginTop: 24}}>
          <b>{t('Lahjio · সৌদি আরবি শেখো', 'Lahjio · Learn Saudi Arabic')}</b>
          <br />
          {t('বাংলায় সৌদি আরবি · দিনে ৫ মিনিট · অডিওসহ ৭৭৩+ শব্দ', 'Real spoken Saudi · 5 min a day · 773+ words with audio')}
          <br />
          {t('ফ্রি শুরু করো ↓', 'Start free ↓')}
          <br />
          <span style={{color: '#00376b', fontWeight: 600}}>lahjio.com</span>
        </div>
        <div style={{display: 'flex', gap: 34, marginTop: 30}}>
          {HL.map((h) => (
            <div key={h.file} style={{textAlign: 'center'}}>
              <div style={{width: 130, height: 130, borderRadius: 130, overflow: 'hidden', boxShadow: '0 0 0 5px #fff, 0 0 0 8px #e5e7eb'}}>
                <div style={{width: 1080, height: 1920, transform: 'scale(0.1204)', transformOrigin: '0 0', marginTop: -50}}>
                  <h.C />
                </div>
              </div>
              <div style={{fontSize: 26, marginTop: 14}}>{t(h.label, h.en)}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(3, ${w}px)`, gap: 2}}>
        {posts.map((P, i) => (
          <Thumb key={i} C={P} w={w} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const launchNewestFirst = [...LAUNCH].reverse().map((p) => p.C);
// week posts: only each carousel's first slide shows on the grid
const weekCovers = WEEK1.filter((p) => !p.file.includes('/slide-') || p.file.endsWith('slide-1')).map((p) => p.C);
export const GridLaunch: React.FC = () => <GridPreview posts={launchNewestFirst} />;
export const GridWeek: React.FC = () => <GridPreview posts={[...weekCovers].reverse().concat(launchNewestFirst).slice(0, 12)} />;
// all 18 posts (launch + days 1–9) = 6 full rows
const day9NewestFirst = [...WEEK2].reverse().map((p) => p.C);
export const GridDay9: React.FC = () => <GridPreview posts={[...day9NewestFirst, ...[...weekCovers].reverse(), ...launchNewestFirst]} />;
