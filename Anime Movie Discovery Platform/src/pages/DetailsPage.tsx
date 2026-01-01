import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Calendar, Clock, Film, Tv, ArrowLeft, Heart, BookOpen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { DetailLoader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { TrailerSection } from '../components/TrailerSection';
import { MediaItem, Anime, Movie, Manga, TV, convertAnimeToMediaItem, convertMovieToMediaItem, convertMangaToMediaItem, convertTVToMediaItem } from '../types';
import { motion } from 'motion/react';
import axios from 'axios';
import { Anime_ENDPOINTS, Movie_ENDPOINTS } from '../api';

// Helper function to extract YouTube video ID
function extractYouTubeId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=))([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

export function DetailsPage() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const numericId = id ? parseInt(id, 10) : 0;
  const isAnime = type === 'anime';
  const isMovie = type === 'movie';
  const isManga = type === 'manga';
  const isTV = type === 'tv';

  // Fetch media details - ANIME
  const { data: animeData, isLoading: animeLoading, error: animeError } = useQuery({
    queryKey: ['anime-details', numericId],
    queryFn: async () => {
      const response = await axios.get(`${Anime_ENDPOINTS.ANIME_DETAIL}/${numericId}`);
      return convertAnimeToMediaItem(response.data.data);
    },
    enabled: isAnime && numericId > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fetch media details - MOVIE
  const { data: movieData, isLoading: movieLoading, error: movieError } = useQuery({
    queryKey: ['movie-details', numericId],
    queryFn: async () => {
      const response = await axios.get(`${Movie_ENDPOINTS.MOVIE_DETAIL}/${numericId}`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          language: 'en-US'
        }
      });
      return convertMovieToMediaItem(response.data);
    },
    enabled: isMovie && numericId > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fetch media details - MANGA
  const { data: mangaData, isLoading: mangaLoading, error: mangaError } = useQuery({
    queryKey: ['manga-details', numericId],
    queryFn: async () => {
      const response = await axios.get(`${Anime_ENDPOINTS.MANGA_DETAIL}/${numericId}`);
      return convertMangaToMediaItem(response.data.data);
    },
    enabled: isManga && numericId > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fetch media details - TV
  const { data: tvData, isLoading: tvLoading, error: tvError } = useQuery({
    queryKey: ['tv-details', numericId],
    queryFn: async () => {
      const response = await axios.get(`${Movie_ENDPOINTS.TV_DETAIL}/${numericId}`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          language: 'en-US'
        }
      });
      return convertTVToMediaItem(response.data);
    },
    enabled: isTV && numericId > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fetch anime trailer (different API structure)
  const { data: animeTrailerKey } = useQuery({
    queryKey: ['anime-trailer', numericId],
    queryFn: async () => {
      const response = await axios.get(`${Anime_ENDPOINTS.ANIME_VIDEOS}/${numericId}/videos`);
      if (response.data?.data?.promo && response.data.data.promo.length > 0) {
        const trailerUrl = response.data.data.promo[0].trailer?.embed_url;
        if (trailerUrl) return extractYouTubeId(trailerUrl);
      }
      return null;
    },
    enabled: isAnime && numericId > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fetch movie trailer (different API structure)
  const { data: movieTrailerKey } = useQuery({
    queryKey: ['movie-trailer', numericId],
    queryFn: async () => {
      const response = await axios.get(`${Movie_ENDPOINTS.MOVIE_VIDEOS}/${numericId}/videos`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          language: 'en-US'
        }
      });
      if (response.data?.results && Array.isArray(response.data.results)) {
        const trailer = response.data.results.find(
          (video: any) =>
            video.site === 'YouTube' &&
            (video.type === 'Trailer' || video.type === 'Teaser') &&
            video.official === true
        ) || response.data.results.find(
          (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
        );
        return trailer?.key || null;
      }
      return null;
    },
    enabled: isMovie && numericId > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fetch TV trailer
  const { data: tvTrailerKey } = useQuery({
    queryKey: ['tv-trailer', numericId],
    queryFn: async () => {
      const response = await axios.get(`${Movie_ENDPOINTS.TV_VIDEOS}/${numericId}/videos`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          language: 'en-US'
        }
      });
      if (response.data?.results && Array.isArray(response.data.results)) {
        const trailer = response.data.results.find(
          (video: any) =>
            video.site === 'YouTube' &&
            (video.type === 'Trailer' || video.type === 'Teaser') &&
            video.official === true
        ) || response.data.results.find(
          (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
        );
        return trailer?.key || null;
      }
      return null;
    },
    enabled: isTV && numericId > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Select appropriate data based on type
  const media = isAnime ? animeData : isMovie ? movieData : isManga ? mangaData : tvData;
  const loading = animeLoading || movieLoading || mangaLoading || tvLoading;
  const error = animeError || movieError || mangaError || tvError;
  const trailerKey = isAnime ? animeTrailerKey : isMovie ? movieTrailerKey : isTV ? tvTrailerKey : null;

  // Check favorite status
  useEffect(() => {
    if (media) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(
        favorites.some(
          (fav: MediaItem) => fav.id === media.id && fav.type === media.type
        )
      );
    }
  }, [media]);

  const toggleFavorite = () => {
    if (!media) return;

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.findIndex(
      (fav: MediaItem) => fav.id === media.id && fav.type === media.type
    );

    if (index >= 0) {
      favorites.splice(index, 1);
      setIsFavorite(false);
    } else {
      favorites.push(media);
      setIsFavorite(true);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  if (loading) {
    return <DetailLoader />;
  }

  if (error || !media) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={error?.message || 'Content not found'} />
        <Button onClick={() => navigate(-1)} className="mt-4" variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <div className="aspect-[2/3] rounded-lg overflow-hidden border border-border">
                <img
                  src={media.posterUrl}
                  alt={media.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                onClick={toggleFavorite}
                className="w-full mt-4 gap-2"
                variant={isFavorite ? 'default' : 'outline'}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Title and Type */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1>{media.title}</h1>
                <Badge className="capitalize" variant="secondary">
                  {media.type}
                </Badge>
              </div>
            </div>

            {/* Rating and Info */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <span>{media.rating.toFixed(1)}</span>
              </div>

              {media.year && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{media.year}</span>
                </div>
              )}

              {media.type === 'anime' && media.episodes && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tv className="h-4 w-4" />
                  <span>{media.episodes} Episodes</span>
                </div>
              )}

              {media.type === 'manga' && (
                <>
                  {media.chapters && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>{media.chapters} Chapters</span>
                    </div>
                  )}
                  {media.volumes && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>{media.volumes} Volumes</span>
                    </div>
                  )}
                </>
              )}

              {media.type === 'tv' && media.episodes && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tv className="h-4 w-4" />
                  <span>{media.episodes} Episodes</span>
                </div>
              )}

              {media.type === 'movie' && media.runtime && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{media.runtime} min</span>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="space-y-2">
              <h3>Genres</h3>
              <div className="flex flex-wrap gap-2">
                {media.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Synopsis */}
            <div className="space-y-2">
              <h3>Synopsis</h3>
              <p className="text-muted-foreground leading-relaxed">
                {media.description}
              </p>
            </div>

            {/* Additional Info */}
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
              <h3>Additional Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground mb-1">Type</p>
                  <div className="flex items-center gap-2">
                    {media.type === 'anime' ? (
                      <Tv className="h-4 w-4" />
                    ) : (
                      <Film className="h-4 w-4" />
                    )}
                    <span className="capitalize">{media.type}</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Rating</p>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span>{media.rating.toFixed(1)} / 10</span>
                  </div>
                </div>
                {media.year && (
                  <div>
                    <p className="text-muted-foreground mb-1">Release Year</p>
                    <p>{media.year}</p>
                  </div>
                )}
                {media.episodes && (
                  <div>
                    <p className="text-muted-foreground mb-1">Episodes</p>
                    <p>{media.episodes}</p>
                  </div>
                )}
                {media.runtime && (
                  <div>
                    <p className="text-muted-foreground mb-1">Runtime</p>
                    <p>{media.runtime} minutes</p>
                  </div>
                )}
              </div>
            </div>

            {/* Trailer Section */}
            {trailerKey && (
              <TrailerSection trailerKey={trailerKey} type={media.type} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
