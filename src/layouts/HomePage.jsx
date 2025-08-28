import VideoSlider from "@/components/home/VideoSlider";
import Articles from "@/components/home/Articles";
import Books from "@/components/home/Books";
import SocialMediaStats from "@/components/home/SocialMediaStats";
import Feedbacks from "@/components/home/Feedbacks";
import WelcomeSection from "@/components/home/WelcomeSection";
import StatsSection from "@/components/home/StatsSection";


const HomePage = () => {
    return (
        <main className="overflow-hidden">
            {/* Hero Section */}
            <section id="hero" className="relative bg-black">
                <VideoSlider />
            </section>

            {/* Welcome Section */}
            <section id="welcome" className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-white">
                <WelcomeSection />
            </section>

            {/* Stats Section */}
            {/* <section id="stats" className="py-16 md:py-20 bg-white">
                <StatsSection />
            </section> */}

            {/* Articles Section */}
            <section id="articles" className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#43b365]/10 rounded-full text-[#43b365] font-medium text-sm mb-4">
                            <span className="w-2 h-2 bg-[#43b365] rounded-full"></span>
                            Ən Son Məqalələr
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            İlahi Bilik və Hikmət
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            İslami elm və hikmətdən doğan məqalələrimizlə ruhunuzu zənginləşdirin
                        </p>
                        <div className="mt-8 w-24 h-1 bg-gradient-to-r from-[#43b365] to-[#2d7a47] mx-auto rounded-full"></div>
                    </div>
                    <Articles />
                </div>
            </section>

            {/* Books Section */}
            <section id="books" className="py-20 md:py-28 bg-gradient-to-br from-white to-slate-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-amber-700 font-medium text-sm mb-4">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            Kitab Kolleksiyamız
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Ruhani Sərvətlər
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            İslami elm və mənəviyyatın dərin mənbələrindən hazırlanmış kitablarımız
                        </p>
                        <div className="mt-8 w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
                    </div>
                    <Books />
                </div>
            </section>

            {/* Social Media Stats Section */}
            <section id="social-stats" className="py-20 md:py-28 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>
                <div className="container mx-auto px-4 max-w-7xl relative">
                    <SocialMediaStats />
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                id="feedbacks"
                className="py-20 md:py-28 relative"
                style={{
                    backgroundImage: "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(/feedbackbg.webp)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium text-sm mb-4">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            Tələbə Rəyləri
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Ürəkdən Gələn Sözlər
                        </h2>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Tələbələrimizin təcrübələri və mənəvi inkişaf hekayələri
                        </p>
                        <div className="mt-8 w-24 h-1 bg-gradient-to-r from-white to-white/70 mx-auto rounded-full"></div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20">
                        <Feedbacks />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
