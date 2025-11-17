/**
 * Date Utilities
 * Helper functions for date formatting
 */

export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return "Tarix bilinmir";

  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return "Tarix bilinmir";
    }

    return new Intl.DateTimeFormat("az-AZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  } catch (error) {
    // Fallback to manual formatting
    try {
      const d = new Date(dateString);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      
      if (!isNaN(Number(day)) && !isNaN(Number(month)) && !isNaN(year)) {
        return `${day}/${month}/${year}`;
      }
    } catch {
      // Silent fail
    }
    
    return dateString;
  }
}

export function formatRelativeTime(dateString: string | undefined | null): string {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Bugün";
    if (diffInDays === 1) return "Dünən";
    if (diffInDays < 7) return `${diffInDays} gün əvvəl`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} həftə əvvəl`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} ay əvvəl`;
    
    return `${Math.floor(diffInDays / 365)} il əvvəl`;
  } catch {
    return "";
  }
}
