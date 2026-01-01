import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CardList } from '../components/CardList';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { MediaItem, Anime, Movie, convertAnimeToMediaItem, convertMovieToMediaItem } from '../types';
import { Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import axios from 'axios';
import { Anime_ENDPOINTS, Movie_ENDPOINTS } from '../api';

export function HomePage() {
  // Fetch top anime with caching
  const { data: anime = [], isLoading: animeLoading, error: animeError } = useQuery({
    queryKey: ['topAnime'],
    queryFn: async () => {
      const response = await axios.get(Anime_ENDPOINTS.TOP_ANIME, {
        params: { limit: 10, page: 1 }
      });
      return response.data.data.slice(0, 10).map((animeData: Anime) => convertAnimeToMediaItem(animeData));
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  // Fetch popular movies with caching
  const { data: movies = [], isLoading: moviesLoading, error: moviesError } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: async () => {
      const response = await axios.get(Movie_ENDPOINTS.POPULAR_MOVIES, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          language: 'en-US',
          page: 1
        }
      });
      return response.data.results.slice(0, 10).map((movieData: Movie) => convertMovieToMediaItem(movieData));
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const loading = animeLoading || moviesLoading;
  const error = animeError?.message || moviesError?.message || null;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-red from-primary/10 to-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="tracking-tight">
              Discover Your Next Favorite
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore thousands of anime series and movies. Find trending titles, top-rated classics,
              and hidden gems all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {error && <ErrorMessage message={error} />}

        {loading ? (
          <>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5" />
                <h2>Trending Anime</h2>
              </div>
              <Loader count={6} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5" />
                <h2>Popular Movies</h2>
              </div>
              <Loader count={6} />
            </div>
          </>
        ) : (
          <>
            {/* Trending Anime */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5" />
                <h2>Trending Anime</h2>
              </div>
              <CardList items={anime} />
            </section>

            {/* Popular Movies */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5" />
                <h2>Popular Movies</h2>
              </div>
              <CardList items={movies} />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
