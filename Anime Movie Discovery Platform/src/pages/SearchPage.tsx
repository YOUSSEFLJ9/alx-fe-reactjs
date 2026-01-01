import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
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
  const [animePage, setAnimePage] = useState(1);
  const [moviePage, setMoviePage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [results, setResults] = useState<MediaItem[]>([]);

  // Fetch anime - either top or search based on query
  const { data: animeData, isLoading: animeLoading } = useQuery({
    queryKey: ['search-anime', searchQuery, animePage],
    queryFn: async () => {
      let animeUrl = Anime_ENDPOINTS.TOP_ANIME;
      let animeParams: any = { limit: 25, page: animePage };
      
      if (searchQuery.trim()) {
        animeUrl = Anime_ENDPOINTS.SEARCH_ANIME;
        animeParams = { query: searchQuery.trim(), limit: 25, page: animePage };
      }
      
      const response = await axios.get(animeUrl, { params: animeParams });
      if (response.data?.data && Array.isArray(response.data.data)) {
        return {
          items: response.data.data
            .map((anime: Anime) => {
              try {
                return convertAnimeToMediaItem(anime);
              } catch (e) {
                console.warn('Failed to convert anime:', e);
                return null;
              }
            })
            .filter((item: MediaItem | null): item is MediaItem => item !== null),
          hasMore: response.data.pagination?.has_next_page || false
        };
      }
      return { items: [], hasMore: false };
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: filters.type === 'all' || filters.type === 'anime',
  });

  // Fetch movies - either popular or search based on query
  const { data: movieData, isLoading: movieLoading } = useQuery({
    queryKey: ['search-movies', searchQuery, moviePage],
    queryFn: async () => {
      let movieUrl = Movie_ENDPOINTS.POPULAR_MOVIES;
      let movieParams: any = {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'en-US',
        page: moviePage
      };
      
      if (searchQuery.trim()) {
        movieUrl = Movie_ENDPOINTS.SEARCH_MOVIES;
        movieParams.query = searchQuery.trim();
      }
      
      const response = await axios.get(movieUrl, { params: movieParams });
      if (response.data?.results && Array.isArray(response.data.results)) {
        return {
          items: response.data.results
            .filter((movie: Movie) => movie.poster_path)
            .map((movie: Movie) => {
              try {
                return convertMovieToMediaItem(movie);
              } catch (e) {
                console.warn('Failed to convert movie:', e);
                return null;
              }
            })
            .filter((item: MediaItem | null): item is MediaItem => item !== null),
          hasMore: response.data.page < response.data.total_pages,
          totalPages: response.data.total_pages
        };
      }
      return { items: [], hasMore: false, totalPages: 1 };
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: filters.type === 'all' || filters.type === 'movie',
  });

  const loading = animeLoading || movieLoading;

  // Combine and apply filters to results
  useEffect(() => {
    let combined: MediaItem[] = [];
    
    if (animeData?.items) combined = [...combined, ...animeData.items];
    if (movieData?.items) combined = [...combined, ...movieData.items];

    // Apply client-side filters
    let filtered = combined;
    
    if (filters.genre !== 'all') {
      filtered = filtered.filter((item) =>
        item.genres.some(genre => genre.toLowerCase() === filters.genre.toLowerCase())
      );
    }

    if (filters.rating !== 'all') {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter((item) => item.rating >= minRating);
    }

    setResults(filtered);
  }, [animeData, movieData, filters]);

  const hasMoreAnime = animeData?.hasMore || false;
  const hasMoreMovies = movieData?.hasMore || false;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    if (hasMoreAnime && (filters.type === 'all' || filters.type === 'anime')) {
      setAnimePage(prev => prev + 1);
    }
    if (hasMoreMovies && (filters.type === 'all' || filters.type === 'movie')) {
      setMoviePage(prev => prev + 1);
    }
    setIsLoadingMore(false);
  };

  // Scroll listener for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 200 && !loading) {
        if (hasMoreAnime || hasMoreMovies) {
          handleLoadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMoreAnime, hasMoreMovies, loading]);

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
