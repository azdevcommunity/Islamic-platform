# 🎨 Yeni İslami Dizayn Sistemi - Tətbiq Təlimatı

## ✅ Tamamlanmış İşlər

### 1. Dizayn Sistemi
- ✅ Yeni rəng paleti (Soft yeşil + beyaz + minimal qızıl)
- ✅ Modern tipografiya (Inter + Crimson Pro + Amiri)
- ✅ İslami geometrik naxışlar
- ✅ Tailwind config yeniləndi
- ✅ Global CSS yeniləndi

### 2. Yaradılmış Komponentlər

#### Navbar
- ✅ `src/components/Navbar/IslamicNavbar.jsx` - Yeni minimal navbar

#### Ana Səhifə
- ✅ `src/layouts/IslamicHomePage.jsx` - Yeni ana səhifə layout
- ✅ `src/components/home/IslamicVideoSlider.jsx` - Hero video slider
- ✅ `src/components/home/IslamicWelcomeSection.jsx` - Welcome bölməsi
- ✅ `src/components/home/IslamicArticles.jsx` - Məqalələr bölməsi
- ✅ `src/components/home/IslamicBooks.jsx` - Kitablar slider

#### Kartlar
- ✅ `src/components/articles/IslamicArticleCard.jsx` - Məqalə kartı
- ✅ `src/components/videos/IslamicVideoCard.jsx` - Video kartı

#### Səhifələr
- ✅ `src/components/questions/IslamicQuestionsPage.jsx` - Suallar səhifəsi
- ✅ `src/components/about/IslamicAboutPage.jsx` - Haqqımızda səhifəsi

#### Footer
- ✅ `src/components/common/IslamicFooter.jsx` - Yeni minimal footer

### 3. Tətbiq Edilmiş Səhifələr
- ✅ Ana səhifə (`src/app/(web)/page.js`)
- ✅ Web layout (`src/app/(web)/layout.js`)
- ✅ Questions səhifəsi (`src/app/(web)/questions/page.jsx`)
- ✅ About səhifəsi (`src/app/(web)/about/page.jsx`)

---

## 🚀 Növbəti Addımlar

### 1. Articles Səhifəsini Yenilə

**Fayl:** `src/app/(web)/articles/page.jsx`

```jsx
import IslamicArticlesPage from "@/components/articles/IslamicArticlesPage";

export const metadata = {
    title: "Məqalələr | Nizamiyyə Mədrəsəsi",
    description: "İslami elm və hikmət məqalələri",
}

const Page = () => {
    return <IslamicArticlesPage />;
};

export default Page;
```

**Yeni komponent yaratmalısan:**
- `src/components/articles/IslamicArticlesPage.jsx`
- Mövcud `ModernArticleCard.jsx` əvəzinə `IslamicArticleCard.jsx` istifadə et

### 2. Videos Səhifəsini Yenilə

**Fayl:** `src/app/(web)/videos/page.jsx`

```jsx
import IslamicVideosPage from "@/components/videos/IslamicVideosPage";

export const metadata = {
    title: "Videolar | Nizamiyyə Mədrəsəsi",
    description: "İslami təlim videoları",
}

const Page = () => {
    return <IslamicVideosPage />;
};

export default Page;
```

**Yeni komponent yaratmalısan:**
- `src/components/videos/IslamicVideosPage.jsx`
- Mövcud `VideoCard.jsx` əvəzinə `IslamicVideoCard.jsx` istifadə et

### 3. Contact Səhifəsini Yenilə

**Fayl:** `src/app/(web)/contact/page.js`

```jsx
import IslamicContactPage from "@/components/contact/IslamicContactPage";

export const metadata = {
    title: "Əlaqə | Nizamiyyə Mədrəsəsi",
    description: "Bizimlə əlaqə saxlayın",
}

const Page = () => {
    return <IslamicContactPage />;
};

export default Page;
```

**Yeni komponent yaratmalısan:**
- `src/components/contact/IslamicContactPage.jsx`

### 4. Books Səhifəsini Yenilə

**Fayl:** `src/app/(web)/books/page.js`

```jsx
import IslamicBooksPage from "@/components/book/IslamicBooksPage";

export const metadata = {
    title: "Kitablar | Nizamiyyə Mədrəsəsi",
    description: "İslami elm kitabları",
}

const Page = () => {
    return <IslamicBooksPage />;
};

export default Page;
```

**Yeni komponent yaratmalısan:**
- `src/components/book/IslamicBooksPage.jsx`

---

## 📋 Komponent Yaratma Şablonu

Hər yeni səhifə üçün bu strukturu istifadə et:

```jsx
"use client"; // Əgər client-side lazımdırsa
import { motion } from "framer-motion";

const IslamicComponentName = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 overflow-hidden">
                <div className="absolute inset-0 bg-islamic-pattern opacity-10"></div>
                
                <div className="container mx-auto px-4 max-w-7xl relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-6"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 font-medium border border-white/20">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            Səhifə Adı
                        </div>
                        
                        {/* Başlıq */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Əsas Başlıq
                            <span className="block text-accent-200 mt-2">Alt Başlıq</span>
                        </h1>
                        
                        {/* Təsvir */}
                        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                            Səhifə təsviri
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Əsas Məzmun */}
            <section className="py-20 md:py-28 bg-white relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Məzmun buraya */}
                </div>
            </section>
        </main>
    );
};

export default IslamicComponentName;
```

---

## 🎨 Dizayn Qaydaları

### Rənglər
```jsx
// Primary (Soft Green)
className="bg-primary-500 text-white"
className="text-primary-700"
className="border-primary-200"

// Accent (Soft Gold - minimal)
className="bg-accent-500 text-white"
className="text-accent-700"

// Neytral (Stone)
className="bg-stone-50"
className="text-stone-900"
className="border-stone-200"
```

### Kartlar
```jsx
<div className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300">
    {/* Məzmun */}
</div>
```

### Düymələr
```jsx
{/* Primary */}
<button className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
    Düymə
</button>

{/* Secondary */}
<button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/30">
    Düymə
</button>
```

### Badge-lər
```jsx
<div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 font-medium text-sm border border-primary-100">
    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
    Badge
</div>
```

### İslami Naxışlar
```jsx
{/* Arxa fon naxışı */}
<div className="absolute inset-0 bg-islamic-pattern opacity-30"></div>

{/* Daha incə naxış */}
<div className="absolute inset-0 bg-islamic-subtle opacity-20"></div>
```

---

## 🧪 Test Etmə

### 1. Development Server
```bash
npm run dev
```

### 2. Yoxlanmalı Səhifələr
- ✅ Ana səhifə: http://localhost:3000
- ✅ Haqqımızda: http://localhost:3000/about
- ✅ Suallar: http://localhost:3000/questions
- ⏳ Məqalələr: http://localhost:3000/articles
- ⏳ Videolar: http://localhost:3000/videos
- ⏳ Əlaqə: http://localhost:3000/contact
- ⏳ Kitablar: http://localhost:3000/books

### 3. Responsive Test
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px

### 4. Browser Test
- Chrome
- Firefox
- Safari
- Edge

---

## 📝 Qeydlər

### Əsas Prinsiplər
1. **Minimal və Təmiz**: Hər element məqsədlidir
2. **Soft Rənglər**: Göz yormayan, rahat
3. **İslami Estetik**: İncə, subtle naxışlar
4. **Modern Tipografiya**: Oxunaqlı, geniş spacing
5. **Premium Hiss**: Keyfiyyətli, professional

### Performans
- Şəkilləri optimize et (Next.js Image)
- Lazy loading istifadə et
- Code splitting tətbiq et
- CSS-i minimize et

### Accessibility
- ARIA labels əlavə et
- Keyboard navigation dəstəyi
- Color contrast yoxla (WCAG AA)
- Screen reader uyğunluğu

---

## 🐛 Problemlər və Həllər

### Problem 1: Naxışlar görünmür
**Həll:** Tailwind config-də `backgroundImage` düzgün təyin edildiyindən əmin ol.

### Problem 2: Rənglər düzgün deyil
**Həll:** `tailwind.config.js`-də yeni rəng paletini yoxla.

### Problem 3: Font yüklənmir
**Həll:** `globals.css`-də Google Fonts import-u yoxla.

---

## 📞 Dəstək

Suallarınız olarsa:
1. `DESIGN_SYSTEM.md` faylına bax
2. Mövcud komponentləri nümunə kimi istifadə et
3. Tailwind dokumentasiyasına bax

---

**Uğurlar! 🚀**

Yeni dizayn sistemi tam hazırdır və tətbiq edilməyə başlanılıb. Qalan səhifələri də eyni prinsiplərlə yeniləyə bilərsən.
