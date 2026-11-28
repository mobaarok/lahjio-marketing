// Week 2 image posts (days 8+), same topics as the daily videos. They continue the green / light checkerboard:
// day 8 green, day 9 light. With them the grid is 18 posts = 6 full rows.
import React from 'react';
import {C} from '../theme';
import {Ar, Card, Grad, Icon, Post, useLang, useT} from './kit';

type Tx = {bn: string; en: string};

// ───────────── Day 8 · ما في مشكلة and other ways to say "no problem" ─────────────
const ALSO: {ar: string; tr: Tx; m: Tx}[] = [
  {ar: 'عادي', tr: {bn: 'আদি', en: "'aadi"}, m: {bn: 'ঠিক আছে, ব্যাপার না', en: "It's fine, no big deal"}},
  {ar: 'ولا يهمك', tr: {bn: 'ওয়ালা ইহিম্মাক', en: 'wala yhimmak'}, m: {bn: 'চিন্তা কোরো না', en: "Don't worry about it"}},
  {ar: 'أبشر', tr: {bn: 'আবশির', en: 'abshir'}, m: {bn: 'অবশ্যই, হয়ে যাবে', en: 'Sure, consider it done'}},
];
export const W8NoProblem: React.FC = () => {
  const t = useT();
  const l = useLang();
  return (
    <Post v="green" tag={t('দিন ৮ · সমস্যা নেই', 'Day 8 · No problem')}>
      <div style={{textAlign: 'center', fontSize: 62, fontWeight: 700, lineHeight: 1.15}}>
        {t('কেউ সরি বললে… ', 'Someone says sorry? ')}
        <span style={{color: C.mint}}>{t('তুমি বলো', 'You say')}</span>
      </div>
      <Card style={{marginTop: 28, padding: '26px 40px 30px', textAlign: 'center', borderRadius: 44, border: 'none', color: C.ink}}>
        <Ar size={110} color={C.ink}>
          ما في مشكلة
        </Ar>
        <div style={{fontSize: 44, color: C.muted, fontWeight: 600}}>{t('মা ফি মুশকিলা', 'ma fi mushkila')}</div>
        <div style={{fontSize: 66, fontWeight: 700, lineHeight: 1.15, marginTop: 8}}>
          <Grad>{t('কোনো সমস্যা নেই', 'No problem')}</Grad>
        </div>
      </Card>
      <div style={{fontSize: 38, fontWeight: 700, marginTop: 30, textAlign: 'center'}}>{t('সৌদিরা আরও বলে', 'Saudis also say')}</div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, marginTop: 14}}>
        {ALSO.map((r) => (
          <div key={r.ar} style={{display: 'flex', alignItems: 'center', gap: 24, borderRadius: 28, background: 'rgba(255,255,255,0.16)', border: '2px solid rgba(255,255,255,0.3)', padding: '8px 30px'}}>
            <div style={{flex: 1}}>
              <div style={{fontSize: 38, fontWeight: 700, lineHeight: 1.2}}>{r.m[l]}</div>
              <div style={{fontSize: 27, fontWeight: 600, color: 'rgba(255,255,255,0.82)'}}>{r.tr[l]}</div>
            </div>
            <Ar size={52} color="#fff">
              {r.ar}
            </Ar>
          </div>
        ))}
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: 32, fontWeight: 600, marginTop: 18, color: 'rgba(255,255,255,0.92)'}}>
        <Icon name="chat" size={42} color="#fff" stroke={2.2} />
        {t('কোনটা আগে শুনেছ? কমেন্টে লেখো', 'Which one have you heard? Tell us below')}
      </div>
    </Post>
  );
};

// ───────────── Day 9 · وش اسمك؟ a first conversation ─────────────
const CHAT: {me: boolean; ar: string; tr: Tx; m: Tx}[] = [
  {me: false, ar: 'وش اسمك؟', tr: {bn: 'ওয়েশ ইসমাক?', en: 'wesh ismak?'}, m: {bn: 'তোমার নাম কী?', en: "What's your name?"}},
  {me: true, ar: 'اسمي رحيم', tr: {bn: 'ইসমি রহিম', en: 'ismi Rahim'}, m: {bn: 'আমার নাম রহিম', en: 'My name is Rahim'}},
  {me: false, ar: 'تشرفنا', tr: {bn: 'তাশাররাফনা', en: 'tasharrafna'}, m: {bn: 'পরিচিত হয়ে খুশি হলাম', en: 'Nice to meet you'}},
  {me: true, ar: 'الشرف لي', tr: {bn: 'আশ-শারাফ লি', en: 'ash-sharaf li'}, m: {bn: 'সম্মান আমারই', en: 'The pleasure is mine'}},
];
export const W9Name: React.FC = () => {
  const t = useT();
  const l = useLang();
  return (
    <Post v="light" tag={t('দিন ৯ · পরিচয়', 'Day 9 · Introductions')}>
      <div style={{textAlign: 'center', fontSize: 60, fontWeight: 700, lineHeight: 1.12}}>
        {t('নতুন কারো সাথে দেখা?', 'Meeting someone new?')}
        <br />
        <Grad>{t('এভাবে বলো', 'Say this')}</Grad>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, marginTop: 14}}>
        {CHAT.map((b) => (
          <div key={b.ar} style={{display: 'flex', justifyContent: b.me ? 'flex-end' : 'flex-start'}}>
            <div
              style={{
                minWidth: 520,
                maxWidth: 700,
                padding: '10px 32px 14px',
                borderRadius: 40,
                borderBottomLeftRadius: b.me ? 40 : 10,
                borderBottomRightRadius: b.me ? 10 : 40,
                background: b.me ? 'linear-gradient(135deg, #059669, #14b8a6)' : '#fff',
                color: b.me ? '#fff' : C.ink,
                border: b.me ? 'none' : `2px solid ${C.line}`,
                boxShadow: '0 14px 30px rgba(15,23,42,0.10)',
                textAlign: b.me ? 'right' : 'left',
              }}
            >
              <Ar size={54} color={b.me ? '#fff' : C.green7} style={{lineHeight: 1.35}}>
                {b.ar}
              </Ar>
              <div style={{fontSize: 34, fontWeight: 700, lineHeight: 1.2, marginTop: 6}}>{b.m[l]}</div>
              <div style={{fontSize: 26, fontWeight: 600, color: b.me ? 'rgba(255,255,255,0.85)' : C.muted}}>{b.tr[l]}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, background: C.g50, border: `2px solid ${C.mint}`, borderRadius: 30, padding: '12px 30px', marginTop: 18}}>
        <Icon name="bulb" size={46} color={C.green} stroke={2.2} />
        <span style={{fontSize: 34, fontWeight: 600, color: C.body}}>{t('নিজের নাম বসিয়ে বলো:', 'Use your own name:')}</span>
        <Ar size={44} color={C.green7}>
          اسمي …
        </Ar>
      </div>
    </Post>
  );
};

export const WEEK2: {file: string; C: React.FC}[] = [
  {file: 'day-8-no-problem', C: W8NoProblem},
  {file: 'day-9-whats-your-name', C: W9Name},
];
