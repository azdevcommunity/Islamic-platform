/**
 * Islamic Footer Component
 * Modern footer with Islamic aesthetic
 */

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import { siteConfig } from "@/config/site";
import SupportButton from "@/components/common/SupportButton";

const footerLinks = [
  { href: "/", label: "Ana Səhifə" },
  { href: "/videos", label: "Videolar" },
  { href: "/articles", label: "Məqalələr" },
  { href: "/questions", label: "Suallar" },
  { href: "/about", label: "Haqqımızda" },
  { href: "/contact", label: "Əlaqə" },
];

const socialLinks = [
  { href: siteConfig.links.facebook, icon: FaFacebook, label: "Facebook" },
  { href: siteConfig.links.instagram, icon: FaInstagram, label: "Instagram" },
  { href: siteConfig.links.youtube, icon: FaYoutube, label: "YouTube" },
  { href: siteConfig.links.whatsapp, icon: FaWhatsapp, label: "WhatsApp" },
];

export function IslamicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white relative overflow-hidden">
      {/* Islamic pattern background */}
      <div className="absolute inset-0 bg-islamic-subtle opacity-20" />

      {/* Main Footer */}
      <div className="container mx-auto px-6 pt-16 pb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and About */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 rounded-xl overflow-hidden border-2 border-primary-500/30">
                <Image
                  src="/esm_logo.png"
                  alt={siteConfig.name}
                  fill
                  className="object-contain p-1.5"
                />
              </div>
              <div className="font-bold text-lg">{siteConfig.name}</div>
            </div>
            
            <p className="text-stone-300 text-sm leading-relaxed">
              Nizamiyyə Mədrəsəsi iman, fiqh və siyer mövzularında mənəvi
              dünyanızı zənginləşdirmək üçün məzmunlar təqdim edir.
            </p>

            {/* Social Media */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-700/50 hover:bg-primary-600 p-2.5 rounded-xl transition-all duration-300 border border-stone-600 hover:border-primary-500"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-base font-semibold mb-5 text-primary-400">
              Səhifələr
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-300 hover:text-primary-400 transition-colors duration-200 flex items-center text-sm group"
                  >
                    <span className="mr-2 text-primary-500 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold mb-5 text-primary-400">
              Əlaqə
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-primary-400 flex-shrink-0" />
                <div className="flex flex-col space-y-2">
                  {siteConfig.contact.phones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-stone-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base font-semibold mb-5 text-primary-400">
              Dəstək Olun
            </h3>
            <p className="text-stone-300 text-sm mb-4 leading-relaxed">
              Mədrəsəmizin fəaliyyətini davam etdirmək və xidmətlərimizi
              genişləndirmək üçün sizin maddi dəstəyinizə ehtiyacımız var.
            </p>

            <div className="space-y-3">
              <SupportButton />
            </div>

            <p className="text-stone-400 text-xs mt-4 italic">
              Allah etdiyiniz ianələri qəbul etsin. Dəstəyiniz üçün minnətdarıq!
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-stone-700/50 py-6 relative">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone-400 text-sm text-center md:text-left">
            © {currentYear} {siteConfig.name}. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  );
}
