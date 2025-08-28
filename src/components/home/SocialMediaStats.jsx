import { FaInstagram, FaYoutube, FaFacebook, FaTelegramPlane } from 'react-icons/fa'; // Using react-icons

const stats = [
    { platform: 'Instagram', icon: FaInstagram, count: '13.8K+', color: 'text-pink-500' },
    { platform: 'YouTube', icon: FaYoutube, count: '35.6K+', color: 'text-red-600' },
    { platform: 'Facebook', icon: FaFacebook, count: '6.3K+', color: 'text-blue-600' },
    { platform: 'Telegram', icon: FaTelegramPlane, count: '1.0K+', color: 'text-sky-500' },
];

const SocialMediaStats = () => {
    return (
        <div className="text-white flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
            {/* Left Section: Text */}
            <div className="w-full lg:w-5/12 text-center lg:text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 font-medium text-sm mb-4">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Sosial Şəbəkələr
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    Bizi İzləyirsinizmi?
                </h2>
                <p className="text-white/80 leading-relaxed text-lg md:text-xl">
                    Rəqəmsal platformalarda milyonlarla insana çatdıq, ürəklərə toxunduq. Hər paylaşım bir hekayənin başlanğıcı
                    oldu. Sizinlə paylaşdığımız hər məzmun aramızda bir körpü qurdu.
                </p>
                <p className="text-white/70 leading-relaxed text-base md:text-lg">
                    Əhli Sünnə Mədrəsəsi olaraq, milyonların ürəyində iman həqiqətlərinin yer alması bizə ümid verir.
                </p>
            </div>

            {/* Right Section: Stats */}
            <div className="w-full lg:w-6/12 grid grid-cols-2 gap-6 lg:gap-8">
                {stats.map((stat, index) => (
                    <div 
                        key={stat.platform} 
                        className="group relative overflow-hidden"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                            {/* Background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
                            
                            {/* Content */}
                            <div className="relative flex flex-col items-center text-center space-y-4">
                                <div className="relative">
                                    <stat.icon className={`text-4xl md:text-5xl ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                                    {/* Glow effect */}
                                    <div className={`absolute inset-0 ${stat.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`}></div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl md:text-3xl font-bold text-white group-hover:text-white transition-colors duration-300">
                                        {stat.count}
                                    </p>
                                    <p className="text-sm md:text-base text-white/70 font-medium">
                                        {stat.platform}
                                    </p>
                                </div>
                            </div>

                            {/* Hover border effect */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-colors duration-300"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SocialMediaStats;

// const SocialMediaStats = () => {
//   return (
//     <div style={{ backgroundColor: "#373D45" }} className="bg-gray-800 text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
//         {/* Sol Bölüm */}
//         <div className="w-full lg:w-5/12 p-5 lg:pr-12 lg:border-r lg:border-gray-400 text-center lg:text-left">
//           <h2 className="text-3xl font-bold mb-4">Bizi izləyirsinizmi?</h2>
//           <p className="text-gray-300 leading-relaxed">
//             Rəqəmsal platformalarda milyonlarla insana çatdıq, ürəklərə toxunduq. Hər paylaşım bir hekayənin başlanğıcı
//             oldu. Sizinlə paylaşdığımız hər məzmun aramızda bir körpü qurdu. Əhli Sünnə Medresesi olaraq, milyonların
//             ürəyində iman həqiqətlərinin yer alması bizə ümid verir.
//           </p>
//         </div>
//
//         {/* Sağ Bölüm */}
//         <div className="w-full lg:w-7/12 flex flex-wrap items-center justify-center  gap-8  lg:gap-12 mt-6 lg:mt-0">
//           {/* Instagram */}
//           <div className="w-1/2 sm:w-1/3 lg:w-auto text-center">
//             <i className="fab fa-instagram text-6xl mb-2"></i>
//             <p className="text-lg">13.800+</p>
//           </div>
//
//           {/* YouTube */}
//           <div className="w-1/2 sm:w-1/3 lg:w-auto text-center">
//             <i className="fab fa-youtube text-6xl mb-2"></i>
//             <p className="text-lg">35.600+</p>
//           </div>
//
//           {/* Facebook */}
//           <div className="w-1/2 sm:w-1/3 lg:w-auto text-center">
//             <i className="fab fa-facebook text-6xl mb-2"></i>
//             <p className="text-lg">6.300+</p>
//           </div>
//
//           {/* Telegram */}
//           <div className="w-1/2 sm:w-1/3 lg:w-auto text-center">
//             <i className="fab fa-telegram text-6xl mb-2"></i>
//             <p className="text-lg">1.000+</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
//
// export default SocialMediaStats
//
