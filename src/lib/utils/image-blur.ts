/**
 * Image Blur Placeholder Utility
 * Generates base64 blur placeholders for images
 */

import { getPlaiceholder } from "plaiceholder";

interface BlurImageResult {
  src: string;
  blurDataURL: string;
  width?: number;
  height?: number;
}

/**
 * Get blur placeholder for an image URL
 * @param imageUrl - URL of the image
 * @returns Object with src and blurDataURL
 */
export async function getBlurPlaceholder(
  imageUrl: string
): Promise<BlurImageResult> {
  try {
    // For external URLs, fetch the image
    if (imageUrl.startsWith("http")) {
      const response = await fetch(imageUrl);
      const buffer = await response.arrayBuffer();
      
      const { base64, metadata } = await getPlaiceholder(Buffer.from(buffer), {
        size: 10, // Small size for blur
      });

      return {
        src: imageUrl,
        blurDataURL: base64,
        width: metadata.width,
        height: metadata.height,
      };
    }

    // For local images - read file as buffer
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "public", imageUrl);
    const buffer = await fs.readFile(filePath);
    
    const { base64, metadata } = await getPlaiceholder(buffer, {
      size: 10,
    });

    return {
      src: imageUrl,
      blurDataURL: base64,
      width: metadata.width,
      height: metadata.height,
    };
  } catch (error) {
    console.error("Failed to generate blur placeholder:", error);
    
    // Return fallback blur
    return {
      src: imageUrl,
      blurDataURL:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
    };
  }
}

/**
 * Get blur placeholders for multiple images
 * @param imageUrls - Array of image URLs
 * @returns Array of blur image results
 */
export async function getBlurPlaceholders(
  imageUrls: string[]
): Promise<BlurImageResult[]> {
  return Promise.all(imageUrls.map((url) => getBlurPlaceholder(url)));
}
