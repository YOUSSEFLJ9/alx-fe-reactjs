import { useState, useEffect } from 'react';
import { CardList } from '../components/CardList';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { MediaItem, Anime, Movie, convertAnimeToMediaItem, convertMovieToMediaItem } from '../types';
import { Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import axios from 'axios';
import { Anime_ENDPOINTS, Movie_ENDPOINTS } from '../api';

export function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [anime, setAnime] = useState<MediaItem[]>([]);
  const [movies, setMovies] = useState<MediaItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response_naime = await axios.get(Anime_ENDPOINTS.TOP_ANIME);
        const options = {method: 'GET', url: Movie_ENDPOINTS.POPULAR_MOVIES, params: {language: 'en-US', page: '1',  api_key: import.meta.env.VITE_TMDB_API_KEY,},
        headers: { accept: 'application/json', }
};
// show only 10 items
      const mediaItems_anime = response_naime.data.data.slice(0, 10).map((animeData: Anime) => convertAnimeToMediaItem(animeData));
      setAnime(mediaItems_anime);
      let response_movies;
      axios.request(options) .then((res) => {
            response_movies = res.data.results;
            const mediaItems_movies = response_movies.slice(0, 10).map((movieData: Movie) => convertMovieToMediaItem(movieData));
            setMovies(mediaItems_movies);

      }).catch(err => console.error(err));

        setError(null);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
