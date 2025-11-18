/**
 * Site Configuration
 * Central configuration for site-wide settings
 */

export const siteConfig = {
    name: "Nizamiyyə Mədrəsəsi",
    description: `Nizamiyyə Mədrəsəsi — səlim İslam düşüncəsinə, elmə və əxlaqa söykənən klassik dini tədris və dəvət ocağıdır.
                  Məqsədimiz Əhli-Sünnə üsulunun təsdiqlədiyi sağlam əqidə, düzgün fiqh və ülvi əxlaq prinsiplərini müasir dövrün 
                  ehtiyaclarına uyğun şəkildə təbliğ etmək, mənəvi boşluqda qalan insanlara istiqamət və dəstək olmaqdır. 
                  Adını tarixdə elmin və maarifin zirvəsi olan Nizamiyyə mədrəsələrindən alan bu müəssisə, qədim elm mirasını yaşadaraq 
                  sağlam cəmiyyətlərin formalaşmasına töhfə verməyi hədəfləyir.`,
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
        name: "Sual və Cavab",
        href: "/questions",
        subcategories: [],
    },
    // {
    //   name: "Kitablar",
    //   href: "/books",
    //   subcategories: [],
    // },
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
