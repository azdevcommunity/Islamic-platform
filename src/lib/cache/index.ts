/**
 * Cache Layer - Central Export
 * Import all cache functions from here
 */

// Configuration
export { CACHE_CONFIG, CACHE_TAGS } from './config';

// Metadata (Edge)
export {
  getCategories,
  getCategoryMenu,
  getTags,
  getCategoryById,
} from './metadata';

// Articles
export {
  getArticlesList,
  getArticleById,
  getPopularArticles,
  getArticleStatistics,
} from './articles';

// Questions
export {
  getQuestionsList,
  getQuestionById,
} from './questions';

// Videos
export {
  getVideosList,
  getPlaylists,
} from './videos';

// Home Sections
export {
  getHomeArticles,
  getHomeVideos,
  getHomeBooks,
  getSocialStats,
} from './home';

// Revalidation Actions
export {
  revalidateArticlesList,
  revalidateArticleDetail,
  revalidateArticles,
  revalidateQuestionsList,
  revalidateQuestionDetail,
  revalidateQuestions,
  revalidateMetadata,
  revalidateHome,
  revalidateVideos,
  revalidateBooks,
  createArticle,
  updateArticle,
  deleteArticle,
  updateCategory,
} from '../actions/revalidate';
