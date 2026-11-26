import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {COPY, Lang} from './copy';
import {Background} from './parts';
import {
  Brand,
  HABIT_COUNT_AT,
  Habit,
  Hook,
  LIFE_AUDIO_AT,
  LIFE_DEAL_AT,
  LIFE_STAGGER,
  Life,
  OUTRO_AUDIO_AT,
  OUTRO_SLAM_AT,
  Outro,
  QUIZ_AUDIO_AT,
  QUIZ_TAP_AT,
  Quiz,
} from './scenes';

// Single source of truth for timing (30fps)
export const SHOTS = {
  hook: {from: 0, dur: 128},
  brand: {from: 128, dur: 96},
  quiz: {from: 224, dur: 246},
  life: {from: 470, dur: 176},
  habit: {from: 646, dur: 150},
  outro: {from: 796, dur: 174},
};
export const TOTAL = SHOTS.outro.from + SHOTS.outro.dur; // 970f ≈ 32.3s

// Arabic pronunciation clips (ElevenLabs, Saudi voice "Abdulrahman")
export const VOICE = [
  {from: SHOTS.quiz.from + QUIZ_AUDIO_AT, src: 'audio/kam-assir.mp3'},
  {from: SHOTS.life.from + LIFE_AUDIO_AT, src: 'audio/kef-halak.mp3'},
  {from: SHOTS.outro.from + OUTRO_AUDIO_AT, src: 'audio/yalla.mp3'},
];

// SFX pin table — every entry relative to a shot
export const SFX: {from: number; src: string; volume: number; dur?: number; note: string}[] = [
  {from: SHOTS.hook.from + 18, src: 'sfx/air-woosh-quick.mp3', volume: 0.35, note: 'chip 1 flies in'},
  {from: SHOTS.hook.from + 26, src: 'sfx/swoosh-quick.mp3', volume: 0.28, note: 'chip 2'},
  {from: SHOTS.hook.from + 34, src: 'sfx/air-woosh-quick.mp3', volume: 0.22, note: 'chip 3'},
  {from: SHOTS.brand.from - 14, src: 'sfx/riser-cine.mp3', volume: 0.35, dur: 28, note: 'lead into logo stamp'},
  {from: SHOTS.brand.from + 12, src: 'sfx/impact-cine-big.mp3', volume: 0.5, dur: 60, note: 'logo stamp lands'},
  {from: SHOTS.brand.from + 18, src: 'sfx/sparkle.mp3', volume: 0.3, note: 'sound waves draw'},
  {from: SHOTS.quiz.from + 2, src: 'sfx/whoosh-big.mp3', volume: 0.4, note: 'phone rises'},
  {from: SHOTS.quiz.from + QUIZ_AUDIO_AT - 2, src: 'sfx/switch-tap.mp3', volume: 0.35, note: 'speaker tapped'},
  {from: SHOTS.quiz.from + QUIZ_TAP_AT, src: 'sfx/switch-tap.mp3', volume: 0.5, note: 'finger taps answer'},
  {from: SHOTS.quiz.from + QUIZ_TAP_AT + 4, src: 'sfx/shimmer-sparkle-sweep.mp3', volume: 0.32, dur: 40, note: 'correct!'},
  {from: SHOTS.quiz.from + QUIZ_TAP_AT + 8, src: 'sfx/pop.mp3', volume: 0.35, note: '+10 XP pops'},
  ...[0, 1, 2, 3].map((i) => ({
    from: SHOTS.life.from + LIFE_DEAL_AT + i * LIFE_STAGGER + 2,
    src: i % 2 === 0 ? 'sfx/paper-slide.mp3' : 'sfx/paper-move-quick.mp3',
    volume: 0.45 - i * 0.05,
    dur: 20,
    note: `card ${i + 1} dealt`,
  })),
  {from: SHOTS.life.from + LIFE_AUDIO_AT - 2, src: 'sfx/switch-tap.mp3', volume: 0.35, note: 'speaker tapped'},
  {from: SHOTS.habit.from, src: 'sfx/swoosh-quick.mp3', volume: 0.3, note: 'title pops'},
  {from: SHOTS.habit.from + HABIT_COUNT_AT, src: 'sfx/clock-knob-spin.mp3', volume: 0.35, dur: 50, note: 'counters roll'},
  {from: SHOTS.habit.from + HABIT_COUNT_AT + 50, src: 'sfx/sparkle.mp3', volume: 0.3, note: 'goal complete check'},
  {from: SHOTS.habit.from + 70, src: 'sfx/pop.mp3', volume: 0.3, note: 'pill 1'},
  {from: SHOTS.habit.from + 77, src: 'sfx/pop.mp3', volume: 0.22, note: 'pill 2'},
  {from: SHOTS.habit.from + 84, src: 'sfx/pop.mp3', volume: 0.16, note: 'pill 3'},
  {from: SHOTS.outro.from, src: 'sfx/riser-cine.mp3', volume: 0.4, dur: OUTRO_SLAM_AT, note: 'group photo assembles'},
  {from: SHOTS.outro.from + 4, src: 'sfx/whoosh-big.mp3', volume: 0.35, note: 'chips fly in'},
  {from: SHOTS.outro.from + OUTRO_SLAM_AT, src: 'sfx/impact-cine-big.mp3', volume: 0.6, dur: 80, note: 'logo slam — loudest moment'},
  {from: SHOTS.outro.from + OUTRO_SLAM_AT + 6, src: 'sfx/shimmer-sparkle-sweep.mp3', volume: 0.3, dur: 45, note: 'afterglow'},
];

const duck = (f: number) => {
  let d = 1;
  for (const v of VOICE) {
    const k = interpolate(f, [v.from - 8, v.from, v.from + 40, v.from + 54], [1, 0.35, 0.35, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    d = Math.min(d, k);
  }
  return d;
};

export type MainProps = {lang: Lang; bgm: boolean};

export const Main: React.FC<MainProps> = ({lang, bgm}) => {
  const t = COPY[lang];
  return (
    <AbsoluteFill>
      <Background />
      <Sequence from={SHOTS.hook.from} durationInFrames={SHOTS.hook.dur}>
        <Hook t={t} lang={lang} dur={SHOTS.hook.dur} />
      </Sequence>
      <Sequence from={SHOTS.brand.from} durationInFrames={SHOTS.brand.dur}>
        <Brand t={t} lang={lang} dur={SHOTS.brand.dur} />
      </Sequence>
      <Sequence from={SHOTS.quiz.from} durationInFrames={SHOTS.quiz.dur}>
        <Quiz t={t} lang={lang} dur={SHOTS.quiz.dur} />
      </Sequence>
      <Sequence from={SHOTS.life.from} durationInFrames={SHOTS.life.dur}>
        <Life t={t} lang={lang} dur={SHOTS.life.dur} />
      </Sequence>
      <Sequence from={SHOTS.habit.from} durationInFrames={SHOTS.habit.dur}>
        <Habit t={t} lang={lang} dur={SHOTS.habit.dur} />
      </Sequence>
      <Sequence from={SHOTS.outro.from} durationInFrames={SHOTS.outro.dur}>
        <Outro t={t} lang={lang} dur={SHOTS.outro.dur} />
      </Sequence>

      {VOICE.map((v, i) => (
        <Sequence key={`v${i}`} from={v.from} durationInFrames={60}>
          <Audio src={staticFile(v.src)} volume={1} />
        </Sequence>
      ))}
      {SFX.map((x, i) => (
        <Sequence key={`s${i}`} from={Math.max(0, x.from)} durationInFrames={x.dur ?? 45}>
          <Audio src={staticFile(x.src)} volume={x.volume} />
        </Sequence>
      ))}
      {bgm ? (
        <Audio
          src={staticFile('bgm/house-vibez.mp3')}
          volume={(f) =>
            0.3 *
            duck(f) *
            interpolate(f, [0, 12, TOTAL - 45, TOTAL], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};
