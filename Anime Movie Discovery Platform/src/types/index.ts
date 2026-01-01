// Type definitions for Anime and Movie data structures

export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  score: number;
  episodes: number;
  synopsis: string;
  genres: Array<{ mal_id: number; name: string }>;
  year?: number;
  type?: string;
}

export interface Manga {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  score: number;
  chapters: number;
  volumes: number;
  synopsis: string;
  genres: Array<{ mal_id: number; name: string }>;
  published?: { prop: { from: { year: number } } };
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;

  adult: boolean;
  backdrop_path: string | null;
  genre_ids?: number[];
  genres?: Array<{ id: number; name: string }>;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
  runtime?: number;
}

export interface TV {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  genre_ids?: number[];
  genres?: Array<{ id: number; name: string }>;
  number_of_episodes?: number;
  number_of_seasons?: number;
}

export interface MediaItem {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
  type: 'anime' | 'movie' | 'manga' | 'tv';
  genres: string[];
  description: string;
  year?: number;
  episodes?: number;
  runtime?: number;
  chapters?: number;
  volumes?: number;
}

export interface FilterOptions {
  genre: string;
  rating: string;
  type: 'all' | 'anime' | 'movie' | 'manga' | 'tv';
  yearFrom: number;
  yearTo: number;
  sortBy: 'rating' | 'releaseDate' | 'popularity';
  sortOrder: 'asc' | 'desc';
}

export interface Character {
  id: number;
  name: string;
  imageUrl: string;
  role?: string;
}


// here we define logic to convert Anime and Movie to MediaItem
export function convertAnimeToMediaItem(anime: Anime): MediaItem {
  return {
    id: anime.mal_id,
    title: anime.title,
    posterUrl: anime.images.jpg.large_image_url,
    rating: anime.score || 0,
    type: 'anime',
    genres: anime.genres.map((genre) => genre.name),
    description: anime.synopsis,
    year: anime.year,
    episodes: anime.episodes,
  };
}

export function convertMangaToMediaItem(manga: Manga): MediaItem {
  return {
    id: manga.mal_id,
    title: manga.title,
    posterUrl: manga.images.jpg.large_image_url,
    rating: manga.score || 0,
    type: 'manga',
    genres: manga.genres.map((genre) => genre.name),
    description: manga.synopsis,
    year: manga.published?.prop?.from?.year,
    chapters: manga.chapters,
    volumes: manga.volumes,
  };
}



const MOVIE_GENRES: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  18: "Drama",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  878: "Science Fiction",
  10749: "Romance",
  10751: "Family",
  10752: "War",
  53: "Thriller",
  27: "Horror",
};


export function convertMovieToMediaItem(movie: Movie): MediaItem {
  // Handle both detail response (genres array) and list response (genre_ids)
  const genres = movie.genres
    ? movie.genres.map(g => g.name)
    : movie.genre_ids?.map((id) => MOVIE_GENRES[id] ?? "Unknown") || [];

  return {
    id: movie.id,
    title: movie.title,
    posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    rating: movie.vote_average || 0,
    type: "movie",
    genres: genres,
    description: movie.overview,
    year: movie.release_date
      ? parseInt(movie.release_date.split("-")[0])
      : undefined,
    runtime: movie.runtime,
  };
}

export function convertTVToMediaItem(tv: TV): MediaItem {
  const genres = tv.genres
    ? tv.genres.map(g => g.name)
    : tv.genre_ids?.map((id) => MOVIE_GENRES[id] ?? "Unknown") || [];

  return {
    id: tv.id,
    title: tv.name,
    posterUrl: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
    rating: tv.vote_average || 0,
    type: "tv",
    genres: genres,
    description: tv.overview,
    year: tv.first_air_date
      ? parseInt(tv.first_air_date.split("-")[0])
      : undefined,
    episodes: tv.number_of_episodes,
  };
}

export const allGenres = [
  'Action',
  'Adventure',
  'Comedy',
  'Crime',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Animation',
  'Documentary',
];