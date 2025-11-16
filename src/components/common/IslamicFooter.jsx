import Link from "next/link"
import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaPhone,
    FaWhatsapp,
} from "react-icons/fa"
import Image from "next/image"
import {bankData, phones} from "@/util/Const";
import SupportButton from "@/components/common/SupportButton";

const IslamicFooter = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white relative overflow-hidden">
            {/* İslami geometrik naxış - arxa fon */}
            <div className="absolute inset-0 bg-islamic-subtle opacity-20"></div>
            
            {/* Əsas Footer */}
            <div className="container mx-auto px-6 pt-16 pb-8 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Logo və Haqqında */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="relative h-14 w-14 rounded-xl overflow-hidden border-2 border-primary-500/30">
                                <Image src="/esm_logo.png" alt="Nizamiyyə Mədrəsəsi" fill
                                       className="object-contain p-1.5"/>
                            </div>
                            <div className="font-bold text-lg">
                                Nizamiyyə Mədrəsəsi
                            </div>
                        </div>
                        <p className="text-stone-300 text-sm leading-relaxed">
                            Nizamiyyə Mədrəsəsi iman, fiqh və siyer mövzularında mənəvi dünyanızı zənginləşdirmək üçün
                            məzmunlar təqdim edir.
                        </p>

                        {/* Sosial Media - Minimal */}
                        <div className="flex space-x-3 pt-2">
                            <a
                                href={process.env.NEXT_PUBLIC_FACEBOOK_CHANNEL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-stone-700/50 hover:bg-primary-600 p-2.5 rounded-xl transition-all duration-300 border border-stone-600 hover:border-primary-500"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={18}/>
                            </a>
                            <a
                                href={process.env.NEXT_PUBLIC_INSTAGRAM_CHANNEL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-stone-700/50 hover:bg-primary-600 p-2.5 rounded-xl transition-all duration-300 border border-stone-600 hover:border-primary-500"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={18}/>
                            </a>
                            <a
                                href={process.env.NEXT_PUBLIC_YTB_CHANNEL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-stone-700/50 hover:bg-primary-600 p-2.5 rounded-xl transition-all duration-300 border border-stone-600 hover:border-primary-500"
                                aria-label="YouTube"
                            >
                                <FaYoutube size={18}/>
                            </a>
                            <a
                                href={process.env.NEXT_PUBLIC_WP_CHANNEL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-stone-700/50 hover:bg-primary-600 p-2.5 rounded-xl transition-all duration-300 border border-stone-600 hover:border-primary-500"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp size={18}/>
                            </a>
                        </div>
                    </div>

                    {/* Səhifələr */}
                    <div>
                        <h3 className="text-base font-semibold mb-5 text-primary-400">Səhifələr</h3>
                        <ul className="space-y-3">
                            {[
                                { href: "/", label: "Ana Səhifə" },
                                { href: "/videos", label: "Videolar" },
                                { href: "/articles", label: "Məqalələr" },
                                { href: "/questions", label: "Suallar" },
                                { href: "/about", label: "Haqqımızda" },
                                { href: "/contact", label: "Əlaqə" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-stone-300 hover:text-primary-400 transition-colors duration-200 flex items-center text-sm group"
                                    >
                                        <span className="mr-2 text-primary-500 group-hover:translate-x-1 transition-transform">→</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Əlaqə */}
                    <div>
                        <h3 className="text-base font-semibold mb-5 text-primary-400">Əlaqə</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <FaPhone className="mt-1 mr-3 text-primary-400 flex-shrink-0"/>
                                <div className="flex flex-col space-y-2">
                                    {phones.map((phone, index) => (
                                        <a key={index} href={`tel:${phone.replace(/\s/g, '')}`}
                                           className="text-stone-300 hover:text-primary-400 transition-colors duration-200 text-sm">
                                            {phone}
                                        </a>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Dəstək */}
                    <div>
                        <h3 className="text-base font-semibold mb-5 text-primary-400">Dəstək Olun</h3>
                        <p className="text-stone-300 text-sm mb-4 leading-relaxed">
                            Mədrəsəmizin fəaliyyətini davam etdirmək və xidmətlərimizi genişləndirmək üçün sizin maddi
                            dəstəyinizə ehtiyacımız var.
                        </p>

                        <div className="space-y-3">
                            <SupportButton bankData={bankData}/>
                        </div>

                        <p className="text-stone-400 text-xs mt-4 italic">
                            Allah etdiyiniz ianələri qəbul etsin. Dəstəyiniz üçün minnətdarıq!
                        </p>
                    </div>
                </div>
            </div>

            {/* Copyright - Minimal */}
            <div className="border-t border-stone-700/50 py-6 relative">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-stone-400 text-sm text-center md:text-left">
                        © {currentYear} Nizamiyyə Mədrəsəsi. Bütün hüquqlar qorunur.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default IslamicFooter
