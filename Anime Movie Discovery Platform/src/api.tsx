 const ANIME_API_URL = 'https://api.jikan.moe/v4/';
 const MOVIE_API_URL = 'https://api.themoviedb.org/3/';

const Anime_ENDPOINTS = {
  TOP_ANIME: ANIME_API_URL + 'top/anime',
  SEARCH_ANIME: ANIME_API_URL + 'anime',
  ANIME_DETAIL: ANIME_API_URL + 'anime', // /{id} will be appended
};

const Movie_ENDPOINTS = {
  POPULAR_MOVIES: MOVIE_API_URL + 'movie/popular',
  SEARCH_MOVIES: MOVIE_API_URL + 'search/movie',
  MOVIE_DETAIL: MOVIE_API_URL + 'movie', // /{id} will be appended
};

export { Anime_ENDPOINTS, Movie_ENDPOINTS };