import VideoSlider from "@/components/home/VideoSlider";
import Articles from "@/components/home/Articles";
import Books from "@/components/home/Books";
import SocialMediaStats from "@/components/home/SocialMediaStats";
import Feedbacks from "@/components/home/Feedbacks";


const HomePage = () => {
    return (
        <main>
            <section id="hero">
                <VideoSlider />
            </section>

            <section id="articles" className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                        Son Məqalələr
                    </h2>
                    <div className="mt-2 mx-auto h-1 w-20 bg-[#43b365] mb-12" />
                    <Articles />
                </div>
            </section>

            <section id="books" className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    {/* Title moved inside the section for better structure */}
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                        Kitablarımız
                    </h2>
                    <div className="mt-2 mx-auto h-1 w-20 bg-[#43b365] mb-12" />
                    <Books />
                </div>
            </section>

            <section id="social-stats" style={{ backgroundColor: "#373D45" }} className="py-16 md:py-20">
                <div className="container mx-auto px-4 ">
                    <SocialMediaStats />
                </div>
            </section>

            <section
                id="feedbacks"
                style={{
                    backgroundImage: "url(/feedbackbg.webp)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                }}
                className="py-16 md:py-24"
            >
                <div className="container mx-auto px-4 bg-black  backdrop-blur-sm rounded-3xl bg-opacity-5 py-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                        Tələbələrimizin Rəyləri
                    </h2>
                    <div className="mt-2 mx-auto h-1 w-20 bg-[#43b365] mb-12" />
                    <Feedbacks />
                </div>
            </section>

        </main>
    );
};

export default HomePage;
