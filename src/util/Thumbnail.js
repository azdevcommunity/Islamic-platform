export function getBestThumbnailUrl(thumbnail) {
  if (!thumbnail || typeof thumbnail !== "string") return ""

  const parts = thumbnail.split("+").filter(Boolean).reverse()

  return parts.find((part) => part.trim() !== "") || ""
}

// Yüksek kaliteli thumbnail (index 0)
export function getHighQualityThumbnail(thumbnail) {
  if (!thumbnail || typeof thumbnail !== "string") return ""

  const parts = thumbnail.split("+").filter(Boolean).reverse()

  return parts[0] || ""
}

// Düşük kaliteli thumbnail (index 3 veya son)
export function getLowQualityThumbnail(thumbnail) {
  if (!thumbnail || typeof thumbnail !== "string") return ""

  const parts = thumbnail.split("+").filter(Boolean).reverse()

  // Index 3 varsa onu al, yoksa son elementi al
  return parts[3] || parts[parts.length - 1] || ""
}

// Her iki thumbnail'i döndür
export function getThumbnailPair(thumbnail) {
  if (!thumbnail || typeof thumbnail !== "string") {
    return { high: "", low: "" }
  }

  const parts = thumbnail.split("+").filter(Boolean).reverse()

  return {
    high: parts[0] || "",
    low: parts[3] || parts[parts.length - 1] || parts[0] || ""
  }
}



export class ThumbnailManager {
  // çoxlu request-ləri önləmək üçün cache
   static cache = new Map();

   // Base64 encode helper (server və client üçün)
   static toBase64(str) {
     if (typeof Buffer !== 'undefined') {
       // Server-side (Node.js)
       return Buffer.from(str).toString('base64');
     } else {
       // Client-side (Browser)
       return btoa(str);
     }
   }

   // Kiçik SVG blur placeholder yaradır (Next.js 8KB limiti üçün)
   static generateSimpleBlur() {
     const svg = `<svg width="700" height="475" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(226,232,240);stop-opacity:1"/><stop offset="100%" style="stop-color:rgb(203,213,225);stop-opacity:1"/></linearGradient></defs><rect width="700" height="475" fill="url(#grad)"/></svg>`;
     return `data:image/svg+xml;base64,${this.toBase64(svg)}`;
   }

   static async fetchBlurDataURL(url) {
    // əvvəl cache-də varsa, geri qaytar
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`Failed to fetch blur image: ${url}`);
        return this.generateSimpleBlur();
      }

      const buffer = await res.arrayBuffer();
      
      // Əgər şəkil çox böyükdürsə (>50KB), sadə blur istifadə et
      if (buffer.byteLength > 50000) {
        const result = this.generateSimpleBlur();
        this.cache.set(url, result);
        return result;
      }

      // ArrayBuffer-i base64-ə çevir
      let base64;
      if (typeof Buffer !== 'undefined') {
        // Server-side
        base64 = Buffer.from(buffer).toString("base64");
      } else {
        // Client-side
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        base64 = btoa(binary);
      }

      // MIME auto detect (fallback image/jpeg)
      const mime = res.headers.get("content-type") ?? "image/jpeg";

      const result = `data:${mime};base64,${base64}`;

      // Əgər base64 çox böyükdürsə (>8KB Next.js limiti), sadə blur istifadə et
      if (result.length > 8192) {
        const simpleBlur = this.generateSimpleBlur();
        this.cache.set(url, simpleBlur);
        return simpleBlur;
      }

      // cache-ə yaz
      this.cache.set(url, result);

      return result;
    } catch (error) {
      console.warn(`Error fetching blur image: ${url}`, error);
      return this.generateSimpleBlur();
    }
  }
}
