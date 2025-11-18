/**
 * Site Configuration
 * Central configuration for site-wide settings
 */

export const siteConfig = {
  name: "Nizamiyyə Mədrəsəsi",
  description: "İslam dini haqqında maarifləndirici məlumatlar və resurslar təqdim edən Nizamiyyə Mədrəsəsi.",
  url: "https://www.nizamiyyemedresesi.az",
  ogImage: "/og-image.jpg",
  locale: "az-AZ",
  
  links: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_CHANNEL_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_CHANNEL_URL || "",
    youtube: process.env.NEXT_PUBLIC_YTB_CHANNEL_URL || "",
    whatsapp: process.env.NEXT_PUBLIC_WP_CHANNEL_URL || "",
  },
  
  contact: {
    phones: ["+994 70 624 00 62"],
    email: "info@nizamiyyemedresesi.az",
  },
  
  support: {
    banks: [
      {
        id: 1,
        bankName: "Leo Bank",
        cardCode: "5411 2498 0153 0416",
      },
      {
        id: 2,
        bankName: "ABB Bank",
        cardCode: "5522 0993 6029 9366",
      },
    ],
  },
} as const;

export const navItems = [
  {
    name: "Videolar",
    href: "/videos",
    subcategories: [],
  },
  {
    name: "Məqalələr",
    href: "/articles",
    subcategories: [],
  },
  {
    name: "Suallar",
    href: "/questions",
    subcategories: [],
  },
  {
    name: "Kitablar",
    href: "/books",
    subcategories: [],
  },
  {
    name: "Haqqımızda",
    href: "/about",
    subcategories: [],
  },
  {
    name: "Əlaqə",
    href: "/contact",
    subcategories: [],
  },
] as const;
