# Lahjio promo: posting kit

## Which file goes where

| Platform | File | Notes |
|---|---|---|
| Instagram Reels / Stories | `out/final/Lahjio-BN-9x16.mp4` | Keep the main text inside the middle 4:5 area (it already is) |
| TikTok | `out/final/Lahjio-BN-9x16-noMusic.mp4` + add a trending sound in TikTok | Trending sounds get more reach. You can also post the music version as-is |
| YouTube Shorts | `out/final/Lahjio-BN-9x16.mp4` | |
| Facebook Reels | `out/final/Lahjio-BN-9x16.mp4` | |
| YouTube (normal video) / Facebook feed / website | `out/final/Lahjio-BN-16x9.mp4` | |
| English audiences / ads | `out/final/Lahjio-EN-*.mp4` | Same cuts with English text |

Every video is about 32 seconds long and runs at 30fps. Each has a **music** version and a **noMusic** version (the noMusic version keeps the sound effects and the Arabic voice).

---

## Captions: Bengali

**Instagram / Facebook**
```
সৌদিতে থাকো, কিন্তু আরবি বুঝতে কষ্ট হয়? 🇸🇦
Lahjio-তে বাংলায় শেখো আসল সৌদি আরবি: দোকানে, ট্যাক্সিতে, কাজে যা প্রতিদিন লাগে।

🔊 প্রতিটি শব্দের আসল উচ্চারণ
🎯 খেলার মতো ছোট ছোট কুইজ
🔥 দিনে মাত্র ৫ মিনিট

শুরু করা ফ্রি 👉 lahjio.com

#সৌদিআরবি #আরবিশেখা #প্রবাসী #SaudiArabic #LearnArabic #Lahjio #প্রবাসীবাংলাদেশি #KSA
```

**TikTok** (short)
```
সৌদিতে "كم السعر؟" মানে কী জানো? 👀 দিনে ৫ মিনিটে বাংলায় শেখো সৌদি আরবি, ফ্রি 👉 lahjio.com
#সৌদিআরবি #প্রবাসী #আরবিশেখা #LearnArabic #fyp
```

**YouTube title / description**
```
Title: সৌদি আরবি শেখো বাংলায়: দিনে মাত্র ৫ মিনিট | Lahjio
Description: দোকানে, ট্যাক্সিতে, কাজে প্রতিদিনের সৌদি আরবি। অডিওসহ ছোট লেসন, কুইজ আর স্ট্রিক। ফ্রি শুরু করো: https://lahjio.com
```

## Captions: English

```
Living in Saudi Arabia but Arabic feels hard? 🇸🇦
Lahjio teaches real Saudi Arabic for the shop, the taxi and work, explained in Bengali.

🔊 Native Saudi audio for every word
🎯 Bite-size quizzes
🔥 Just 5 minutes a day

Start free 👉 lahjio.com
#LearnArabic #SaudiArabic #Expat #KSA #Lahjio
```

---

## Credits and licenses
- Arabic voice clips: ElevenLabs, voice "Abdulrahman" (Saudi). Generated on your account, so they are yours to use commercially under your ElevenLabs plan.
- Music: "House Vibez" by Lily J, Mixkit Stock Music Free License (free for commercial use, no credit needed).
- Sound effects: Mixkit Free License. Four of them (`whoosh-big`, `riser-cine`, `sparkle`, `pop`) have no traceable source URL, so if you want to be strict about licensing for paid ads, use the noMusic version or swap those four.
- Rendering engine: Remotion. Free for individuals and small companies; check https://remotion.dev/license if your company grows.

## Editing the video
- Project: `lahjio-promo/`. Run `npm run dev` to open Remotion Studio and preview or edit live.
- All text (Bengali and English) is in `src/copy.ts`, and timing is in `src/Main.tsx` (`SHOTS`).
- To re-render one video: `npx remotion render src/index.ts Lahjio-BN-9x16 out/final/Lahjio-BN-9x16.mp4`
