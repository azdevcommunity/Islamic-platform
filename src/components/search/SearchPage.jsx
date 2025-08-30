"use client"

import { useEffect, useState, useCallback } from "react" // Added useCallback
import { useSearchParams, useRouter } from "next/navigation"
import HttpClient from "@/util/HttpClient"
import Link from "next/link"
import CacheProvider from "@/util/CacheProvider"
import Image from "next/image"
// Assuming 'books' is meant to be static for now, keep the import
import { booksData as staticBooks } from "@/components/home/Books"
import { Search, X, Loader2, BookOpen, Video, Newspaper, User, Calendar } from "lucide-react"
import VideoCard from "@/components/videos/VideoCard"; // Import icons

// --- Constants ---
const CACHE_DURATION_MINUTES = 5; // Example cache duration

// --- Main Component ---
export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial search parameters from URL
  const initialSearchValue = searchParams.get("searchValue") || "";
  const initialCategoryId = searchParams.get("categoryId") || ""; // Keep if category filtering is still relevant

  // --- State ---
  const [searchQuery, setSearchQuery] = useState(initialSearchValue); // Input field state, initialized from URL
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({ articles: [], videos: [], books: [] });
  const [error, setError] = useState(null);

  // --- Data Fetching ---
  const fetchSearchData = useCallback(async (currentSearchValue, currentCategoryId) => {
    // Only fetch if there's something to search for
    if (!currentSearchValue && !currentCategoryId) {
      setLoading(false);
      setResults({ articles: [], videos: [], books: [] }); // Clear results if search is empty
      // Optional: Redirect home if absolutely no params were ever intended
      // if (!initialSearchValue && !initialCategoryId) router.push('/');
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors

    let url = "/search?";
    const queryParams = new URLSearchParams();
    let cacheKey = "search";

    if (currentSearchValue) {
      queryParams.set('search', currentSearchValue);
      cacheKey += `_query_${currentSearchValue}`;
    }
    if (currentCategoryId) {
      queryParams.set('categoryId', currentCategoryId);
      cacheKey += `_cat_${currentCategoryId}`;
    }

    url += queryParams.toString();

    try {
      const data = await CacheProvider.fetchData(
          cacheKey,
          CACHE_DURATION_MINUTES, // Use constant for cache duration
          async () => HttpClient.get(url) // No need for .json() if HttpClient handles it
      );

      // Validate fetched data structure (optional but good practice)
      setResults({
        articles: Array.isArray(data?.articles) ? data.articles : [],
        videos: Array.isArray(data?.videos) ? data.videos : [],
        // Use static books for now as per original code, or fetch if API provides them
        books: staticBooks // Assuming books are static or handled differently
        // books: Array.isArray(data?.books) ? data.books : [], // Use if books come from API
      });
    } catch (err) {
      console.error("Error fetching search data:", err);
      setError("Axtarış zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
      setResults({ articles: [], videos: [], books: [] }); // Clear results on error
    } finally {
      setLoading(false);
    }
  }, []); // Removed router from dependencies as it's stable

  // Effect to fetch data when URL search params change
  useEffect(() => {
    fetchSearchData(initialSearchValue, initialCategoryId);
  }, [initialSearchValue, initialCategoryId, fetchSearchData]); // Depend on values from URL

  // --- Handlers ---
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    // Optionally trigger navigation immediately or wait for submit
    // router.push('/search'); // Clears URL param immediately
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery && !initialCategoryId) { // Avoid empty search navigation unless category is set
      // Optionally provide feedback instead of just returning
      return;
    }
    // Update URL to trigger fetch useEffect
    const newParams = new URLSearchParams();
    if (trimmedQuery) newParams.set('searchValue', trimmedQuery);
    if (initialCategoryId) newParams.set('categoryId', initialCategoryId); // Preserve category if present

    router.push(`/search?${newParams.toString()}`);
  };

  // Utility to generate video route
  const generateVideoRoute = (playlistId, videoId) => {
    const params = new URLSearchParams();
    if (playlistId != null) params.set("playlistId", playlistId);
    if (videoId != null) params.set("videoId", videoId);
    return `/videos?${params.toString()}`;
  };

  // --- Render Logic ---
  const hasResults = results.articles.length > 0 || results.videos.length > 0 || results.books.length > 0;
  const showNoResultsMessage = !loading && !error && !hasResults && (initialSearchValue || initialCategoryId);

  return (
      <main className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* --- Enhanced Search Bar --- */}
          <div className="mb-12 md:mb-16">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="group relative">
                <div className="relative flex items-center bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 focus-within:shadow-2xl focus-within:scale-[1.02] transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-primary-400 group-focus-within:text-primary-600 transition-colors duration-200" />
                  </div>
                  <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      placeholder="Məqalə, video və ya kitab axtarın..."
                      className="flex-grow py-5 pl-16 pr-32 sm:pr-40 border-none focus:ring-0 outline-none text-gray-800 placeholder-gray-400 text-lg font-medium bg-transparent"
                  />
                  {searchQuery && (
                      <button
                          type="button"
                          onClick={handleClearSearch}
                          className="absolute inset-y-0 right-28 sm:right-36 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 z-10"
                          aria-label="Axtarışı təmizlə"
                      >
                        <X className="h-5 w-5" />
                      </button>
                  )}
                  <button
                      type="submit"
                      disabled={!searchQuery.trim()}
                      className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 sm:px-8 py-5 font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Search className="h-5 w-5" />
                    <span className="hidden sm:inline">Axtar</span>
                  </button>
                </div>
                {/* Decorative gradient line */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-60"></div>
              </form>
            </div>
          </div>

          {/* --- Enhanced Page Title --- */}
          {(initialSearchValue || initialCategoryId) && (
              <div className="text-center mb-12 md:mb-16">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                  Axtarış Nəticələri
                </h1>
                {initialSearchValue && (
                    <p className="text-xl md:text-2xl text-gray-600 font-medium">
                      <span className="text-primary-600 font-semibold">"{initialSearchValue}"</span> üçün tapılan nəticələr
                    </p>
                )}
                <div className="mt-6 flex justify-center">
                  <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"></div>
                </div>
              </div>
          )}


          {/* --- Enhanced Loading State --- */}
          {loading && (
              <div className="flex flex-col justify-center items-center py-24">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-pulse"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary-600 rounded-full animate-spin"></div>
                </div>
                <p className="mt-6 text-gray-600 font-medium animate-pulse">Axtarış edilir...</p>
              </div>
          )}

          {/* --- Enhanced Error Message --- */}
          {error && !loading && (
              <div className="max-w-2xl mx-auto text-center py-12 px-8 bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
                  <X className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-3">Xəta baş verdi</h3>
                <p className="text-red-700 font-medium leading-relaxed">{error}</p>
              </div>
          )}

          {/* --- Enhanced No Results Message --- */}
          {showNoResultsMessage && (
              <div className="max-w-2xl mx-auto text-center py-20 px-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-100 shadow-xl">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 mb-8 shadow-lg">
                  <Search className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nəticə tapılmadı</h3>
                <p className="text-gray-600 max-w-lg mx-auto mb-8 text-lg leading-relaxed">
                  <span className="font-semibold text-primary-600">"{initialSearchValue}"</span> üçün uyğun nəticə tapılmadı. Fərqli açar sözlər və ya daha ümumi terminlər yoxlayın.
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-sm">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">İslam</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">Quran</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">Hədiş</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">Fiqh</span>
                </div>
              </div>
          )}

          {/* --- Enhanced Results Sections --- */}
          {!loading && !error && hasResults && (
              <div className="space-y-16 md:space-y-20">
                {/* Articles Section */}
                <ModernSection title="Məqalələr" data={results.articles} icon={Newspaper} gradient="from-blue-500 to-blue-600">
                  {results.articles.map((article, index) => (
                      <ModernCard
                          key={article.id}
                          href={`/articles/${article.id}`}
                          image={article.image || '/placeholder-image.png'}
                          title={article.title}
                          info1Label="Müəllif"
                          info1={article.authorName}
                          info1Icon={User}
                          info2Label="Kateqoriyalar"
                          info2={article.categories?.join(", ") || "Təyin edilməyib"}
                          animationDelay={index * 0.1}
                      />
                  ))}
                </ModernSection>

                {/* Videos Section */}
                <ModernSection title="Videolar" data={results.videos} icon={Video} gradient="from-red-500 to-red-600">
                  {results.videos.map((video, index) => {
                    const thumbnailUrls = video.thumbnail?.split("+") || [];
                    const displayThumbnail = thumbnailUrls[2] || thumbnailUrls[0] || '/placeholder-video.png';
                    const formattedDate = video.publishedAt ? new Date(video.publishedAt).toLocaleDateString('az-AZ', { year: 'numeric', month: 'long', day: 'numeric' }) : "Naməlum";

                    return (
                        <div key={video.videoId} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                          <VideoCard
                              video={video}
                              link={generateVideoRoute(video.playlistId, video.videoId)}
                              content={"video"}
                          />
                        </div>
                    );
                  })}
                </ModernSection>

                {/* Books Section */}
                <ModernSection title="Kitablar" data={results.books} icon={BookOpen} gradient="from-green-500 to-green-600">
                  {results.books.map((book, index) => (
                      <ModernCard
                          key={book.id}
                          href={book.href || "#"}
                          image={book.image || '/placeholder-books.png'}
                          title={book.title}
                          info1Label="Müəllif"
                          info1={book.authorName}
                          info1Icon={User}
                          animationDelay={index * 0.1}
                      />
                  ))}
                </ModernSection>
              </div>
          )}
        </div>
      </main>
  );
}


// --- Enhanced Section Component ---
function ModernSection({ title, data, children, icon: Icon, gradient = "from-primary-500 to-primary-600" }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
      <section className="animate-fadeInUp">
        <div className="mb-8 md:mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {Icon && (
                <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} text-white shadow-lg mr-4`}>
                  <Icon className="h-6 w-6" />
                </div>
              )}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-1">{data.length} nəticə tapıldı</p>
              </div>
            </div>
            <div className={`hidden md:block w-24 h-1 bg-gradient-to-r ${gradient} rounded-full`}></div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {children}
        </div>
      </section>
  );
}


// --- Enhanced Card Component ---
function ModernCard({ href, image, title, info1Label, info1, info1Icon: Info1Icon, info2Label, info2, info2Icon: Info2Icon, animationDelay = 0 }) {
  return (
      <Link 
        href={href} 
        className="group block bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 animate-fadeInUp"
        style={{ animationDelay: `${animationDelay}s` }}
      >
        <div className="relative w-full aspect-video overflow-hidden">
          <img
              src={image}
              alt={title || "Card image"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-700 mb-3 line-clamp-2 transition-colors duration-300 leading-tight">
            {title}
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            {info1 && (
                <div className="flex items-center">
                  {Info1Icon && <Info1Icon className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />}
                  <span className="font-semibold text-gray-700 mr-2">{info1Label}:</span>
                  <span className="line-clamp-1 text-gray-600">{info1}</span>
                </div>
            )}
            {info2 && (
                <div className="flex items-center">
                  {Info2Icon && <Info2Icon className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />}
                  <span className="font-semibold text-gray-700 mr-2">{info2Label}:</span>
                  <span className="line-clamp-1 text-gray-600">{info2}</span>
                </div>
            )}
          </div>
        </div>
      </Link>
  );
}

// "use client"
//
// import { useEffect, useState } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import HttpClient from "@/util/HttpClient"
// import Link from "next/link"
// import CacheProvider from "@/util/CacheProvider"
// import Spinner from "@/components/search/Spinner"
// import Image from "next/image"
// import { books } from "@/components/home/Books"
//
// export default function SearchPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   // Get the initial categoryId from query params (if any)
//   const initialCategoryId = searchParams.get("categoryId") || ""
//   const searchValue = searchParams.get("searchValue") || ""
//
//   // Local state for user input in the search bar
//   const [searchState, setSearchState] = useState("")
//
//   const [loading, setLoading] = useState(true)
//   const [articles, setArticles] = useState([])
//   const [videos, setVideos] = useState([])
//   // const [books, setBooks] = useState([]);
//
//   // Fetch data whenever `categoryId` in the URL changes
//   useEffect(() => {
//     if (searchValue === "" && initialCategoryId === "") {
//       router.push("/")
//     }
//     // console.log("fetch")
//     fetchSearchData()
//   }, [initialCategoryId, searchValue])
//
//   const fetchSearchData = () => {
//     // if (!initialCategoryId) {
//     //     // If there's no categoryId in the URL, we may choose to skip fetching or do a default fetch
//     //     setLoading(false);
//     //     return;
//     // }
//     // setLoading(true);
//     let url = "/search?"
//     let key = "search"
//     if (initialCategoryId || initialCategoryId !== "") {
//       url += `categoryId=${initialCategoryId}`
//       key += `_${initialCategoryId}`
//     }
//
//     if (searchValue || searchValue !== "") {
//       url += `search=${searchValue}`
//       key += `_${searchValue}`
//     }
//
//     CacheProvider.fetchData(key, 0.1, async () => HttpClient.get(url))
//       // .then((res) => res.json())
//       .then((data) => {
//         setArticles(data.articles)
//         setVideos(data.videos)
//         // setBooks(data.books);
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err)
//       })
//       .finally(() => setLoading(false))
//   }
//
//   // Handle search form submission
//   const handleSearchSubmit = (e) => {
//     e.preventDefault()
//     // Navigate to /search?categoryId=searchValue
//     if (!searchState) return
//     router.push(`/search?searchValue=${searchState}`)
//   }
//
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-r from-yellow-50 to-yellow-100">
//         <Spinner />
//       </div>
//     )
//   }
//
//   const generateRoute = (playlistId, videoId) => {
//     const searchParams = new URLSearchParams()
//     if (playlistId != null) {
//       searchParams.set("playlistId", playlistId)
//     }
//
//     if (videoId != null) {
//       searchParams.set("videoId", videoId)
//     }
//
//     return `/videos?${searchParams}`
//   }
//
//   return (
//     <main className="min-h-screen w-full bg-gradient-to-b from-yellow-50 to-orange-50">
//       {/* Search Bar */}
//       <div className="max-w-6xl mx-auto px-4 py-6">
//         <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 bg-white shadow-md rounded-lg py-3 px-4">
//           <input
//             type="text"
//             value={searchState}
//             onChange={(e) => setSearchState(e.target.value)}
//             placeholder="Axtaris"
//             className="flex-1 border-none outline-none text-gray-700"
//           />
//           <button
//             disabled={searchState === null || searchState === undefined || searchState.trim() === ""}
//             type="submit"
//             className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-gradient bg-gradient-to-r from-yellow-600 via-orange-500 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
//           Axtarışın nəticələri
//         </h1>
//
//         {/*<ConsoleLog log={articles} />*/}
//         {/* Articles Section */}
//         <Section title="Məqalələr" data={articles}>
//           {articles?.map((article) => (
//             <Card
//               href={`/articles/${article.id}`}
//               key={article.id}
//               image={article.image}
//               title={article.title}
//               info1Label="Kategoriyalar"
//               info1={article.categories.join(", ")}
//               info2Label="Müəllif"
//               info2={article.authorName}
//             />
//           ))}
//         </Section>
//
//         {/* Videos Section */}
//         <Section title="Videolar" data={videos}>
//           {videos?.map((video) => {
//             const thumbnailUrls = video.thumbnail.split("+")
//             return (
//               <Card
//                 href={generateRoute(video.playlistId, video.videoId)}
//                 key={video.videoId}
//                 image={thumbnailUrls[2] ?? thumbnailUrls[0]}
//                 title={video.title}
//                 info1Label="Published At"
//                 info1={new Date(video.publishedAt).toLocaleDateString()}
//               />
//             )
//           })}
//         </Section>
//
//         {/* Books Section */}
//         <Section title="Kitablar" data={books}>
//           {books?.map((books) => (
//             <Card
//               href={"#"}
//               key={books.id}
//               image={books.image}
//               title={books.title}
//               info1Label="Müəllif"
//               info1={books.authorName}
//             />
//           ))}
//         </Section>
//       </div>
//     </main>
//   )
// }
//
// /**
//  * Section Component
//  * Renders a heading and a grid of items (children).
//  */
// function Section({ title, data, children }) {
//   return (
//     <section className="mb-12">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
//       {data?.length === 0 ? (
//         <p className="text-gray-600">{title.toLowerCase()} tapılmadı.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{children}</div>
//       )}
//     </section>
//   )
// }
//
// /**
//  * Card Component
//  * A more modern card with hover animations and subtle styling.
//  */
// function Card({ image, title, info1Label, info1, info2Label, info2, href }) {
//   return (
//     <div className="group relative flex flex-col border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
//       {/* Image */}
//       <div className="overflow-hidden h-40 md:h-48">
//         <Image
//           height={50}
//           width={500}
//           src={image}
//           alt={title}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//       </div>
//
//       {/* Card Body */}
//       <div className="p-4 flex flex-col justify-between flex-1">
//         <h3 className="text-lg hover:text-yellow-600 font-semibold mb-2 text-gray-800 line-clamp-2">
//           <Link href={href}>{title}</Link>
//         </h3>
//         <div className="text-sm text-gray-600 space-y-1">
//           {info1 && (
//             <p>
//               <span className="font-semibold">{info1Label}: </span>
//               {info1}
//             </p>
//           )}
//           {info2 && (
//             <p>
//               <span className="font-semibold">{info2Label}: </span>
//               {info2}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
//
