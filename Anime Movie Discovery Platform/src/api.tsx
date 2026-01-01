 const ANIME_API_URL = 'https://api.jikan.moe/v4/';
 const MOVIE_API_URL = 'https://api.themoviedb.org/3/';

const Anime_ENDPOINTS = {
  TOP_ANIME: ANIME_API_URL + 'top/anime',
  SEARCH_ANIME: ANIME_API_URL + 'anime',
  ANIME_DETAIL: ANIME_API_URL + 'anime', // /{id} will be appended
  ANIME_VIDEOS: ANIME_API_URL + 'anime', // /{id}/videos will be appended
  ANIME_CHARACTERS: ANIME_API_URL + 'anime', // /{id}/characters will be appended
  TOP_MANGA: ANIME_API_URL + 'top/manga',
  SEARCH_MANGA: ANIME_API_URL + 'manga',
  MANGA_DETAIL: ANIME_API_URL + 'manga', // /{id} will be appended
  MANGA_CHARACTERS: ANIME_API_URL + 'manga', // /{id}/characters will be appended
};

const Movie_ENDPOINTS = {
  POPULAR_MOVIES: MOVIE_API_URL + 'movie/popular',
  SEARCH_MOVIES: MOVIE_API_URL + 'search/movie',
  MOVIE_DETAIL: MOVIE_API_URL + 'movie', // /{id} will be appended
  MOVIE_VIDEOS: MOVIE_API_URL + 'movie', // /{id}/videos will be appended
  MOVIE_CREDITS: MOVIE_API_URL + 'movie', // /{id}/credits will be appended
  POPULAR_TV: MOVIE_API_URL + 'tv/popular',
  SEARCH_TV: MOVIE_API_URL + 'search/tv',
  TV_DETAIL: MOVIE_API_URL + 'tv', // /{id} will be appended
  TV_VIDEOS: MOVIE_API_URL + 'tv', // /{id}/videos will be appended
  TV_CREDITS: MOVIE_API_URL + 'tv', // /{id}/credits will be appended
};

export { Anime_ENDPOINTS, Movie_ENDPOINTS };