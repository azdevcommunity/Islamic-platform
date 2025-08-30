import React from 'react';
import { Heart, BookOpen, Users, Target, Star, Award } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative w-full h-[600px] sm:h-[700px] lg:h-[800px] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <img
          src="/about_us.png"
          alt="Haqqımızda Fon"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/85 via-slate-900/75 to-emerald-800/70"></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-32 h-32 bg-white/5 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-teal-300/10 rounded-full blur-lg animate-pulse delay-1000"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 sm:px-8 max-w-5xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-emerald-200 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              <span>Əhli Sünnə Mədrəsəsi</span>
            </div>
          </div>

          <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight">
            Məqsədimiz
          </h1>

          <p className="text-emerald-100 text-xl sm:text-2xl leading-relaxed max-w-4xl mx-auto mb-8">
          Əlisünnə Mədrəsəsi olaraq, İslam dininin hikmətini və mənəvi dəyərlərini geniş auditoriyaya çatdırmaq üçün fəaliyyət göstəririk. Məqsədimiz, Əhli Sünnə təlimlərinin əsasında, saf və düzgün dini bilikləri təqdim edərək, fərdlərin imanını möhkəmləndirmək və cəmiyyətə faydalı olmaqdır. Hər kəsi İslamın mərhəmət və sevgi dolu mesajı ilə tanış etmək ən önəmli vəzifəmizdir.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-emerald-200">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">Dini Təhsil</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Cəmiyyət Xidməti</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">Mənəvi İnkişaf</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="relative mt-20 z-10">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">

          {/* Stats Section */}
          {/* <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-600">Dərs Materialı</div>
              </div>
              <div className="group">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">1000+</div>
                <div className="text-sm text-gray-600">Tələbə</div>
              </div>
              <div className="group">
                <div className="w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">10+</div>
                <div className="text-sm text-gray-600">İl Təcrübə</div>
              </div>
              <div className="group">
                <div className="w-16 h-16 bg-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
                <div className="text-sm text-gray-600">Müəllim</div>
              </div>
            </div>
          </div> */}

          {/* Section 1: Tədris və Maarifləndirmə */}
          <section className="mb-32">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
              {/* Image */}
              <div className="w-full lg:w-1/2 flex-shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <img
                    src="/about_us_2.png"
                    alt="Tədris və Maarifləndirmə"
                    className="relative w-full h-auto rounded-2xl shadow-2xl object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              {/* Text */}
              <div className="w-full lg:w-1/2">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <BookOpen className="w-4 h-4" />
                    <span>Təhsil və Maarifləndirmə</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Tədris və
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"> Maarifləndirmə</span>
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                  Bizim əsas fəaliyyət istiqamətimiz İslam elmlərinin dərinliklərinə enərək, onları aydın və asan başa düşülən şəkildə təqdim etməkdir. Qurani-Kərim təfsiri, hədislər, fiqh və əxlaq dərsləri vasitəsilə dini bilikləri həm yeni başlayanlar, həm də inkişaf etmiş bilik səviyyəsinə malik olan şəxslər üçün əlçatan edirik. Təlimlərimizdə yalnız nəzəri biliklər deyil, həm də bu biliklərin gündəlik həyatda tətbiqinə xüsusi diqqət yetiririk. Bu yanaşma, insanların yalnız dini biliklərini artırmaqla kifayətlənməyərək, eyni zamanda mənəvi olaraq güclənmələrinə dəstək olur.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                  Digər tərəfdən, müasir dövrün ehtiyaclarına uyğunlaşmağı əsas prinsip kimi qəbul edirik. Mədrəsəmizdə təqdim olunan maarifləndirmə materialları, dini və mənəvi bilikləri praktik şəkildə həyata keçirə bilməyə yönəldilmişdir. Hədəfimiz, biliklərlə yanaşı, mənəviyyatı gücləndirən bir yol yoldaşı olmaqdır.
                  </p>

                  {/* Feature highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Qurani-Kərim Təfsiri</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Əxlaq Dərsləri</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Dəyərlərimiz və Görüşümüz */}
          <section className="mb-20">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-20">
              {/* Text */}
              <div className="w-full lg:w-1/2">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Target className="w-4 h-4" />
                    <span>Dəyərlər və Vizyon</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Dəyərlərimiz və
                    <span className="text-emerald-600"> Görüşümüz</span>
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                  Əlisünnə Mədrəsəsi sevgi, sülh və birlik dəyərlərinə sadiq qalaraq, İslamın bütün insanlara təqdim etdiyi universal mesajı vurğulayır. Biz, hər bir fərdin bu dünyada mənəvi axtarışını gücləndirmək və onu doğru istiqamətləndirmək üçün yaradılmışıq. Əsas dəyərlərimizdən biri, hər bir fərdin dindən aldığı bilikləri sevgi və anlayışla paylaşmasına şərait yaratmaqdır. İnanırıq ki, İslam dəyərlərinin düzgün təbliği, cəmiyyətlər arasında həmrəyliyin və harmoniyanın inkişafına xidmət edir.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                  Eyni zamanda, gələcəyə baxışımızı müasir dünyanın ehtiyaclarına uyğun formalaşdırmışıq. Vizyonumuz, İslamın hikmət dolu irsini həm yerli, həm də qlobal miqyasda təbliğ edərək, bilik, əxlaq və iman üzərində qurulan bir cəmiyyətin yaranmasına töhfə verməkdir. Təlimlərimizlə insanlara yalnız din öyrətmirik, eyni zamanda onların mənəvi ehtiyaclarına cavab verərək həyatlarında mənalı bir iz qoymağı hədəfləyirik.
                  </p>

                  {/* Core values */}
                  <div className="grid grid-cols-1 gap-4 mt-8">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Sevgi və Mərhəmət</div>
                        <div className="text-sm text-gray-600">İslamın mərhəmət dolu mesajını yaymaq</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Birlik və Həmrəylik</div>
                        <div className="text-sm text-gray-600">Cəmiyyətdə harmoniyanın təmin edilməsi</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Image */}
              <div className="w-full lg:w-1/2 flex-shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gray-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <img
                    src="/4mezheb.png"
                    alt="Dəyərlərimiz və Görüşümüz"
                    className="relative w-full h-auto rounded-2xl shadow-2xl object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Call to Action Section */}
      {/* <div className="bg-emerald-600 py-20">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Bizimlə Birlikdə Öyrənin
            </h2>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              İslam elmlərini öyrənmək və mənəvi inkişafınızı davam etdirmək üçün bizə qoşulun. 
              Hər səviyyədən tələbələr üçün uyğun proqramlarımız var.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg">
                Dərslərə Başla
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition-colors duration-200">
                Ətraflı Məlumat
              </button>
            </div>
          </div>
        </div> */}
    </div>
  );
};

export default AboutUsPage;
