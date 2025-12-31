import { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { CardList } from '../components/CardList';
import { Loader } from '../components/Loader';
import { EmptyState } from '../components/EmptyState';
import { MediaItem, FilterOptions, Anime, Movie, convertAnimeToMediaItem, convertMovieToMediaItem } from '../types';
import axios from 'axios';
import { Anime_ENDPOINTS, Movie_ENDPOINTS } from '../api';

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    genre: 'all',
    rating: 'all',
    type: 'all',
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MediaItem[]>([]);
  const [animePage, setAnimePage] = useState(1);
  const [moviePage, setMoviePage] = useState(1);
  const [hasMoreAnime, setHasMoreAnime] = useState(true);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const searchAndFilter = async () => {
      setLoading(true);
      setAnimePage(1);
      setMoviePage(1);
      setHasMoreAnime(true);
      setHasMoreMovies(true);
      
      try {
        let filtered: MediaItem[] = [];

        // Fetch anime results
        if (filters.type === 'all' || filters.type === 'anime') {
          try {
            let animeUrl = Anime_ENDPOINTS.TOP_ANIME;
            let animeParams: any = { limit: 25, page: 1 };
            
            // If search query exists, use search endpoint
            if (searchQuery.trim()) {
              animeUrl = Anime_ENDPOINTS.SEARCH_ANIME;
              animeParams = { query: searchQuery.trim(), limit: 25, page: 1 };
            }
            
            const animeResponse = await axios.get(animeUrl, { params: animeParams });
            
            if (animeResponse.data && animeResponse.data.data && Array.isArray(animeResponse.data.data)) {
              const animeItems: MediaItem[] = animeResponse.data.data
                .map((anime: Anime) => {
                  try {
                    return convertAnimeToMediaItem(anime);
                  } catch (e) {
                    console.warn('Failed to convert anime:', anime, e);
                    return null;
                  }
                })
                .filter((item: MediaItem | null): item is MediaItem => item !== null);
              
              filtered = [...filtered, ...animeItems];
              setHasMoreAnime(animeResponse.data.pagination?.has_next_page || false);
            } else {
              setHasMoreAnime(false);
            }
          } catch (err) {
            console.error('Error fetching anime:', err);
            setHasMoreAnime(false);
          }
        }

        // Fetch movie results
        if (filters.type === 'all' || filters.type === 'movie') {
          try {
            let movieUrl = Movie_ENDPOINTS.POPULAR_MOVIES;
            let movieParams: any = {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: 'en-US',
              page: 1
            };
            
            // If search query exists, use search endpoint
            if (searchQuery.trim()) {
              movieUrl = Movie_ENDPOINTS.SEARCH_MOVIES;
              movieParams.query = searchQuery.trim();
            }
            
            const movieResponse = await axios.get(movieUrl, { params: movieParams });
            
            if (movieResponse.data && movieResponse.data.results && Array.isArray(movieResponse.data.results)) {
              const movieItems: MediaItem[] = movieResponse.data.results
                .filter((movie: Movie) => movie.poster_path) // Filter out movies without poster
                .map((movie: Movie) => {
                  try {
                    return convertMovieToMediaItem(movie);
                  } catch (e) {
                    console.warn('Failed to convert movie:', movie, e);
                    return null;
                  }
                })
                .filter((item: MediaItem | null): item is MediaItem => item !== null);
              
              filtered = [...filtered, ...movieItems];
              setHasMoreMovies(movieResponse.data.page < movieResponse.data.total_pages);
            } else {
              setHasMoreMovies(false);
            }
          } catch (err) {
            console.error('Error fetching movies:', err);
            setHasMoreMovies(false);
          }
        }

        // Apply client-side filters
        
        // Filter by genre
        if (filters.genre !== 'all') {
          filtered = filtered.filter((item) =>
            item.genres.some(genre => genre.toLowerCase() === filters.genre.toLowerCase())
          );
        }

        // Filter by rating
        if (filters.rating !== 'all') {
          const minRating = parseFloat(filters.rating);
          filtered = filtered.filter((item) => item.rating >= minRating);
        }

        setResults(filtered);
      } catch (err) {
        console.error('Error in search:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchAndFilter();
  }, [searchQuery, filters]);

  // Load more content when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Check if user is near bottom (within 200px)
      if (scrollTop + clientHeight >= scrollHeight - 200 && !isLoadingMore && !loading) {
        const shouldLoadAnime = (filters.type === 'all' || filters.type === 'anime') && hasMoreAnime;
        const shouldLoadMovies = (filters.type === 'all' || filters.type === 'movie') && hasMoreMovies;
        
        if (shouldLoadAnime || shouldLoadMovies) {
          loadMoreContent();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoadingMore, loading, hasMoreAnime, hasMoreMovies, filters.type, animePage, moviePage, searchQuery, filters.genre, filters.rating]);

  const loadMoreContent = async () => {
    setIsLoadingMore(true);
    
    try {
      let newItems: MediaItem[] = [];

      // Load more anime
      if ((filters.type === 'all' || filters.type === 'anime') && hasMoreAnime) {
        try {
          const nextAnimePage = animePage + 1;
          let animeUrl = Anime_ENDPOINTS.TOP_ANIME;
          let animeParams: any = { limit: 25, page: nextAnimePage };
          
          if (searchQuery.trim()) {
            animeUrl = Anime_ENDPOINTS.SEARCH_ANIME;
            animeParams = { query: searchQuery.trim(), limit: 25, page: nextAnimePage };
          }
          
          const animeResponse = await axios.get(animeUrl, { params: animeParams });
          
          if (animeResponse.data && animeResponse.data.data && Array.isArray(animeResponse.data.data)) {
            const animeItems: MediaItem[] = animeResponse.data.data
              .map((anime: Anime) => {
                try {
                  return convertAnimeToMediaItem(anime);
                } catch (e) {
                  console.warn('Failed to convert anime:', anime, e);
                  return null;
                }
              })
              .filter((item: MediaItem | null): item is MediaItem => item !== null);
            
            newItems = [...newItems, ...animeItems];
            setAnimePage(nextAnimePage);
            setHasMoreAnime(animeResponse.data.pagination?.has_next_page || false);
          }
        } catch (err) {
          console.error('Error loading more anime:', err);
          setHasMoreAnime(false);
        }
      }

      // Load more movies
      if ((filters.type === 'all' || filters.type === 'movie') && hasMoreMovies) {
        try {
          const nextMoviePage = moviePage + 1;
          let movieUrl = Movie_ENDPOINTS.POPULAR_MOVIES;
          let movieParams: any = {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: 'en-US',
            page: nextMoviePage
          };
          
          if (searchQuery.trim()) {
            movieUrl = Movie_ENDPOINTS.SEARCH_MOVIES;
            movieParams.query = searchQuery.trim();
          }
          
          const movieResponse = await axios.get(movieUrl, { params: movieParams });
          
          if (movieResponse.data && movieResponse.data.results && Array.isArray(movieResponse.data.results)) {
            const movieItems: MediaItem[] = movieResponse.data.results
              .filter((movie: Movie) => movie.poster_path) // Filter out movies without poster
              .map((movie: Movie) => {
                try {
                  return convertMovieToMediaItem(movie);
                } catch (e) {
                  console.warn('Failed to convert movie:', movie, e);
                  return null;
                }
              })
              .filter((item: MediaItem | null): item is MediaItem => item !== null);
            
            newItems = [...newItems, ...movieItems];
            setMoviePage(nextMoviePage);
            setHasMoreMovies(movieResponse.data.page < movieResponse.data.total_pages);
          }
        } catch (err) {
          console.error('Error loading more movies:', err);
          setHasMoreMovies(false);
        }
      }

      // Apply client-side filters to new items
      let filteredNew = newItems;
      
      if (filters.genre !== 'all') {
        filteredNew = filteredNew.filter((item) =>
          item.genres.some(genre => genre.toLowerCase() === filters.genre.toLowerCase())
        );
      }

      if (filters.rating !== 'all') {
        const minRating = parseFloat(filters.rating);
        filteredNew = filteredNew.filter((item) => item.rating >= minRating);
      }

      setResults((prev: MediaItem[]) => [...prev, ...filteredNew]);
    } catch (err) {
      console.error('Error loading more content:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 space-y-2">
          <h1>Search & Discover</h1>
          <p className="text-muted-foreground">
            Find your next favorite anime or movie
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Content Grid with Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </aside>

          {/* Results */}
          <main className="lg:col-span-3">
            {loading ? (
              <Loader count={12} />
            ) : results.length > 0 ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Found {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
                <CardList items={results} />
                {isLoadingMore && (
                  <div className="py-8">
                    <Loader count={6} />
                  </div>
                )}
                {!isLoadingMore && !hasMoreAnime && !hasMoreMovies && results.length > 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No more results to load
                  </p>
                )}
              </div>
            ) : (
              <EmptyState type="search" />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
