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

