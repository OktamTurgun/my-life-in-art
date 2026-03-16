# San'atdagi hayot yo'lim 📖

O'zbekiston san'atkorlari haqida interaktiv kitob ilovasi.  
Muallif: **Mirzo Ulug'bek**

---

## 🌐 Demo

**Web versiya:** [my-life-in-art.vercel.app](https://my-life-in-art.vercel.app)  
**Android APK:** [expo.dev](https://expo.dev/accounts/uktam/projects/sanatdagi-hayot-yolim)

---

## 📱 Ilova haqida

Bu ilova 30 ta o'zbek san'atkori — yozuvchi, rassom, musiqachi, rejissyor va boshqalarning hayot yo'li, ijodi va video suhbatlarini o'z ichiga oladi.

### Asosiy xususiyatlar
- 🌍 **Ko'p tillilik** — O'zbek, Ingliz, Rus tillarida
- 🌙 **Dark / Light mode** — Avtomatik rang tizimi
- 📱 **Responsive** — Web, iOS va Android da ishlaydi
- 🎥 **YouTube video** — Har bir san'atkor uchun video suhbat
- ⚡ **Tez yuklanish** — Lokal JSON ma'lumotlar

---

## 🛠 Texnologiyalar

| Texnologiya | Maqsad |
|-------------|--------|
| Expo (React Native) | iOS, Android, Web |
| Expo Router | Sahifalar navigatsiyasi |
| TypeScript | Type xavfsizligi |
| i18n (uz/en/ru) | Ko'p tillilik |
| EAS Build | App store build |
| Vercel | Web deployment |

---

## 📁 Loyiha strukturasi
```
sanatdagi-hayot-yolim/
│
├── app/                    ← Expo Router sahifalari
│   ├── _layout.tsx         ← Root layout (Navbar, Sidebar, Footer)
│   ├── index.tsx           ← Bosh sahifa (redirect)
│   └── person/[id].tsx     ← Shaxs detail sahifasi
│
├── components/             ← UI komponentlar
│   ├── Navbar.tsx          ← Yuqori panel + til tanlash
│   ├── Sidebar.tsx         ← Ishtirokchilar ro'yxati
│   ├── PersonDetail.tsx    ← Shaxs ma'lumotlari
│   ├── PersonCard.tsx      ← Ro'yxat elementi
│   ├── VideoPlayer.tsx     ← YouTube video player
│   └── Footer.tsx          ← Quyi panel
│
├── data/
│   └── people.json         ← 30 ta san'atkor ma'lumotlari
│
├── locales/                ← Tarjimalar
│   ├── uz.json             ← O'zbek
│   ├── en.json             ← Ingliz
│   └── ru.json             ← Rus
│
├── hooks/
│   ├── usePeople.ts        ← Ma'lumot olish hook
│   ├── useColors.ts        ← Dark/Light mode ranglari
│   └── useLanguage.ts      ← Til tizimi hook
│
├── constants/
│   └── colors.js           ← Rang tizimi (Light + Dark)
│
└── assets/
    └── images/
        └── avatars/        ← San'atkorlar rasmlari
```

---

## 🚀 Ishga tushirish

### 1. O'rnatish
```bash
git clone https://github.com/OktamTurgun/my-life-in-art.git
cd my-life-in-art
npm install
```

### 2. Ishga tushirish
```bash
npx expo start
```

Terminalda:
- **`w`** — Brauzerda ochish
- **`a`** — Android emulatorda ochish
- **QR kod** — Expo Go ilovasida skanerlash

---

## 📦 Build

### Android APK (preview)
```bash
$env:EXPO_TOKEN="your_token"
eas build --platform android --profile preview
```

### Web deployment
```bash
npx expo export --platform web
vercel --prod dist
```

### Production build
```bash
eas build --platform all --profile production
```

---

## 🌍 Til tizimi

Ilova 3 tilda ishlaydi:

| Til | Kod | Holat |
|-----|-----|-------|
| O'zbek | `uz` | ✅ To'liq |
| Ingliz | `en` | ✅ To'liq |
| Rus | `ru` | ✅ To'liq |

Yangi til qo'shish uchun:
1. `locales/` papkasiga yangi `.json` fayl qo'shing
2. `hooks/useLanguage.ts` da `Language` type ga qo'shing
3. `components/Navbar.tsx` da `langs` arrayiga qo'shing

---

## 👥 Ma'lumot qo'shish

`data/people.json` ga yangi san'atkor qo'shish:
```json
{
  "id": "31",
  "name": "Ism Familiya",
  "profession": "Kasb",
  "image": "https://rasm-url.com/rasm.jpg",
  "title_uz": "Sarlavha UZ",
  "title_en": "Title EN",
  "title_ru": "Заголовок RU",
  "text_uz": "Matn o'zbek tilida...",
  "text_en": "Text in English...",
  "text_ru": "Текст на русском...",
  "videoId": "YouTube_Video_ID"
}
```

---

## 📄 Litsenziya

© 2026 Uktam Turgun. Barcha huquqlar himoyalangan.

- **Kitob muallifi:** Mirzo Ulug'bek
- **Ilova yaratuvchi:** Oktam Turgun