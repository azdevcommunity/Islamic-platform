import IslamicVideoSlider from "@/components/home/IslamicVideoSlider";
import IslamicArticles from "@/components/home/IslamicArticles";
import IslamicBooks from "@/components/home/IslamicBooks";
import SocialMediaStats from "@/components/home/SocialMediaStats";
import Feedbacks from "@/components/home/Feedbacks";
import IslamicWelcomeSection from "@/components/home/IslamicWelcomeSection";

const IslamicHomePage = () => {
    return (
        <main className="overflow-hidden bg-stone-50">
            {/* Hero Section - Video Slider */}
            <section id="hero" className="relative bg-stone-900">
                <IslamicVideoSlider />
            </section>

            {/* Welcome Section - Minimal və zərif */}
            <section id="welcome" className="py-20 md:py-28 bg-gradient-to-br from-white via-stone-50 to-white relative">
                {/* İncə İslami naxış */}
                <div className="absolute inset-0 bg-islamic-pattern opacity-30"></div>
                <div className="relative">
                    <IslamicWelcomeSection />
                </div>
            </section>

            {/* Articles Section - Təmiz və minimal */}
            <section id="articles" className="py-20 md:py-28 bg-white relative">
                <IslamicArticles />
            </section>

            {/* Books Section - Soft background */}
            <section id="books" className="py-20 md:py-28 bg-gradient-to-br from-stone-50 to-white relative">
                {/* İslami naxış */}
                <div className="absolute inset-0 bg-islamic-subtle opacity-20"></div>
                
                <div className="container mx-auto px-4 max-w-7xl relative">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-50 rounded-full text-accent-700 font-medium text-sm mb-4 border border-accent-100">
                            <span className="w-2 h-2 bg-accent-500 rounded-full"></span>
                            Kitablarımız
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                            Ruhani Sərvətlər
                        </h2>
                        <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
                            İslami elm və mənəviyyatın dərin mənbələrindən hazırlanmış kitablarımız
                        </p>
                        <div className="mt-8 w-24 h-0.5 bg-gradient-to-r from-accent-400 to-accent-600 mx-auto rounded-full"></div>
                    </div>
                    <IslamicBooks />
                </div>
            </section>

            {/* Social Media Stats - Koyu fon */}
            <section id="social-stats" className="py-20 md:py-28 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-800 relative overflow-hidden">
                {/* İslami geometrik naxış */}
                <div className="absolute inset-0 bg-islamic-pattern opacity-5"></div>
                <div className="container mx-auto px-4 max-w-7xl relative">
                    <SocialMediaStats />
                </div>
            </section>

            {/* Testimonials Section - Paralaks effekt */}
            <section
                id="feedbacks"
                className="py-20 md:py-24 relative"
                style={{
                    backgroundImage: "linear-gradient(135deg, rgba(28, 25, 23, 0.85), rgba(41, 37, 36, 0.75)), url(/feedbackbg.webp)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium text-sm mb-4 border border-white/20">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            Tələbə Rəyləri
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Sizdən Gələnlər
                        </h2>
                        <div className="mt-8 w-24 h-0.5 bg-gradient-to-r from-white to-white/70 mx-auto rounded-full"></div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20">
                        <Feedbacks />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default IslamicHomePage;
