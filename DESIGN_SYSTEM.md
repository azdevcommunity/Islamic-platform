# Nizamiyyə Mədrəsəsi - Modern İslami Dizayn Sistemi

## 🎨 Dizayn Fəlsəfəsi

Bu dizayn sistemi **modern minimalizm** ilə **İslami estetik**i birləşdirərək yaradılmışdır. Əsas prinsiplər:

- **Sakinlik və Təmizlik**: Göz yormayan, rahat oxunan interfeys
- **Minimal Rəng Paleti**: Soft yeşil + beyaz əsas, qızıl minimal akcent
- **İslami Geometrik Naxışlar**: Çox incə və subtle, arxa fonda
- **Modern Tipografiya**: Oxunaqlı, geniş satır aralıqlı
- **Premium Hiss**: Keyfiyyətli, professional görünüş

---

## 🎨 Rəng Paleti

### Ana Rənglər (Primary - Soft Green)
```css
primary-50:  #f0fdf7  /* Çox açıq yaşıl */
primary-100: #dcfce9
primary-200: #bbf7d6
primary-300: #86efb4
primary-400: #4ade8a
primary-500: #12a19a  /* Ana soft yeşil */
primary-600: #0d8a84
primary-700: #0a6e6a
primary-800: #085854
primary-900: #064845
```

### Akcent Rənglər (Accent - Soft Gold)
```css
accent-50:  #fefce8
accent-100: #fef9c3
accent-200: #fef08a
accent-300: #fde047
accent-400: #facc15
accent-500: #d4a574  /* Soft gold - minimal istifadə */
accent-600: #b8935f
accent-700: #9a7a4d
```

### Neytral Rənglər (Stone)
```css
stone-50:  #fafaf9  /* Arxa fon */
stone-100: #f5f5f4
stone-200: #e7e5e4  /* Border */
stone-300: #d6d3d1
stone-400: #a8a29e
stone-500: #78716c
stone-600: #57534e  /* Mətn */
stone-700: #44403c
stone-800: #292524
stone-900: #1c1917  /* Başlıqlar */
```

---

## 📝 Tipografiya

### Font Ailələri
```css
font-sans: 'Inter', system-ui, sans-serif        /* Əsas mətn */
font-serif: 'Crimson Pro', Georgia, serif        /* Başlıqlar (opsional) */
font-arabic: 'Amiri', serif                      /* Ərəbcə mətnlər */
```

### Font Ölçüləri
```css
text-xs:   0.75rem  (12px)  /* Kiçik məlumat */
text-sm:   0.875rem (14px)  /* İkinci dərəcəli mətn */
text-base: 1rem     (16px)  /* Əsas mətn */
text-lg:   1.125rem (18px)  /* Böyük mətn */
text-xl:   1.25rem  (20px)  /* Kiçik başlıq */
text-2xl:  1.5rem   (24px)
text-3xl:  1.875rem (30px)
text-4xl:  2.25rem  (36px)  /* Orta başlıq */
text-5xl:  3rem     (48px)  /* Böyük başlıq */
text-6xl:  3.75rem  (60px)  /* Hero başlıq */
```

### Font Çəkiləri
```css
font-light:     300  /* İkinci dərəcəli mətn */
font-normal:    400  /* Əsas mətn */
font-medium:    500  /* Vurğu */
font-semibold:  600  /* Kiçik başlıqlar */
font-bold:      700  /* Əsas başlıqlar */
font-extrabold: 800  /* Hero başlıqlar */
```

---

## 🎯 Komponent Qaydaları

### Kartlar (Cards)
```jsx
<div className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300">
  {/* Məzmun */}
</div>
```

**Xüsusiyyətlər:**
- Border radius: `rounded-2xl` (16px)
- Border: `border-stone-200`
- Shadow: `shadow-sm` → `hover:shadow-lg`
- Hover: Border rəngi dəyişir, shadow artır

### Düymələr (Buttons)

#### Primary Button
```jsx
<button className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
  Düymə Mətni
</button>
```

#### Secondary Button
```jsx
<button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/30">
  Düymə Mətni
</button>
```

### Badge-lər
```jsx
<div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 font-medium text-sm border border-primary-100">
  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
  Badge Mətni
</div>
```

---

## 🎭 İslami Geometrik Naxışlar

### Arxa Fon Naxışları
```jsx
{/* İncə naxış - çox subtle */}
<div className="absolute inset-0 bg-islamic-pattern opacity-30"></div>

{/* Daha incə naxış */}
<div className="absolute inset-0 bg-islamic-subtle opacity-20"></div>
```

**Qeyd:** Naxışlar həmişə çox incə (opacity: 0.02-0.05) və arxa fonda olmalıdır.

---

## 📐 Spacing (Boşluqlar)

### Padding/Margin Qaydaları
```css
/* Kiçik komponentlər */
p-4  (16px)
p-5  (20px)
p-6  (24px)

/* Orta komponentlər */
p-8  (32px)
p-10 (40px)
p-12 (48px)

/* Böyük bölmələr */
py-16 (64px)
py-20 (80px)
py-24 (96px)
py-28 (112px)
```

### Gap (Aralar)
```css
gap-2  (8px)   /* Kiçik elementlər */
gap-4  (16px)  /* Orta elementlər */
gap-6  (24px)  /* Böyük elementlər */
gap-8  (32px)  /* Bölmələr arası */
```

---

## 🎬 Animasiyalar

### Fade In Up
```jsx
<div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
  {/* Məzmun */}
</div>
```

### Hover Effektləri
```css
/* Kart hover */
hover:-translate-y-1
hover:shadow-lg
transition-all duration-300

/* Şəkil hover */
group-hover:scale-105
transition-transform duration-500

/* Rəng hover */
hover:text-primary-700
transition-colors duration-300
```

---

## 📱 Responsive Dizayn

### Breakpoints
```css
sm:  640px   /* Kiçik tablet */
md:  768px   /* Tablet */
lg:  1024px  /* Kiçik desktop */
xl:  1280px  /* Desktop */
2xl: 1536px  /* Böyük desktop */
```

### Grid Sistemləri
```jsx
{/* Məqalələr grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Kartlar */}
</div>

{/* İki sütun layout */}
<div className="grid lg:grid-cols-2 gap-16">
  {/* Məzmun */}
</div>
```

---

## 🎨 Gradient-lər

### Arxa Fon Gradient-ləri
```css
/* Açıq gradient */
bg-gradient-to-br from-white via-stone-50 to-white

/* Soft gradient */
bg-gradient-to-br from-stone-50 to-white

/* Koyu gradient */
bg-gradient-to-br from-stone-800 via-stone-900 to-stone-800

/* Primary gradient */
bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700
```

### Mətn Gradient-ləri
```jsx
<span className="text-transparent bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text">
  Gradient Mətn
</span>
```

---

## 🔍 Shadow (Kölgə) Sistemləri

```css
shadow-sm:   0 1px 2px rgba(0,0,0,0.05)      /* Minimal */
shadow:      0 1px 3px rgba(0,0,0,0.1)       /* Kiçik */
shadow-md:   0 4px 6px rgba(0,0,0,0.1)       /* Orta */
shadow-lg:   0 10px 15px rgba(0,0,0,0.1)     /* Böyük */
shadow-xl:   0 20px 25px rgba(0,0,0,0.1)     /* Çox böyük */
shadow-2xl:  0 25px 50px rgba(0,0,0,0.25)    /* Hero */
```

---

## ✅ Yeni Komponentlər

### Yaradılmış Komponentlər
1. ✅ `IslamicNavbar.jsx` - Modern minimal navbar
2. ✅ `IslamicWelcomeSection.jsx` - Welcome bölməsi
3. ✅ `IslamicArticles.jsx` - Məqalələr bölməsi
4. ✅ `IslamicArticleCard.jsx` - Məqalə kartı
5. ✅ `IslamicVideoSlider.jsx` - Hero video slider
6. ✅ `IslamicBooks.jsx` - Kitablar slider
7. ✅ `IslamicFooter.jsx` - Footer
8. ✅ `IslamicHomePage.jsx` - Ana səhifə layout
9. ✅ `IslamicQuestionsPage.jsx` - Suallar səhifəsi
10. ✅ `IslamicVideoCard.jsx` - Video kartı

---

## 🚀 İstifadə Qaydaları

### 1. Yeni komponentləri import edin:
```jsx
import IslamicNavbar from "@/components/Navbar/IslamicNavbar"
import IslamicHomePage from "@/layouts/IslamicHomePage"
import IslamicFooter from "@/components/common/IslamicFooter"
```

### 2. Layout-da istifadə edin:
```jsx
export default function Layout({ children }) {
  return (
    <>
      <IslamicNavbar menus={menus} />
      {children}
      <IslamicFooter />
    </>
  )
}
```

### 3. Ana səhifədə istifadə edin:
```jsx
import IslamicHomePage from "@/layouts/IslamicHomePage"

export default function Home() {
  return <IslamicHomePage />
}
```

---

## 📋 Checklist

### Tamamlanmalı İşlər
- [ ] Bütün səhifələrdə yeni komponentləri tətbiq et
- [ ] Videos səhifəsini yenilə
- [ ] Articles səhifəsini yenilə
- [ ] Questions səhifəsini yenilə
- [ ] About səhifəsini yenilə
- [ ] Contact səhifəsini yenilə
- [ ] Dark mode dəstəyini yoxla
- [ ] Mobile responsive-i test et
- [ ] Performance optimizasiyası

---

## 🎯 Əsas Prinsiplər

1. **Minimal və Təmiz**: Hər element məqsədlidir
2. **Soft Rənglər**: Göz yormayan, rahat
3. **İslami Estetik**: İncə, subtle naxışlar
4. **Modern Tipografiya**: Oxunaqlı, geniş spacing
5. **Premium Hiss**: Keyfiyyətli, professional
6. **Responsive**: Bütün ekranlarda mükəmməl
7. **Performans**: Sürətli yüklənmə
8. **Accessibility**: Hamı üçün əlçatan

---

**Dizayn Tarixi:** 2024
**Versiya:** 1.0.0
**Status:** ✅ Hazır
