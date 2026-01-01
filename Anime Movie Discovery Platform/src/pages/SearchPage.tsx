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
    yearFrom: 1900,
    yearTo: new Date().getFullYear(),
    sortBy: 'rating',
    sortOrder: 'desc',
  });
  const [animePage, setAnimePage] = useState(1);
  const [moviePage, setMoviePage] = useState(1);
  const [allAnimeItems, setAllAnimeItems] = useState<MediaItem[]>([]);
  const [allMovieItems, setAllMovieItems] = useState<MediaItem[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

  // Accumulate anime items for infinite scroll
  useEffect(() => {
    if (animeData?.items) {
      setAllAnimeItems(prev => {
        // Reset on page 1 (new search/filter)
        if (animePage === 1) return animeData.items;
        // Append new items for pagination
        const existingIds = new Set(prev.map(item => item.id));
        const newItems = animeData.items.filter(item => !existingIds.has(item.id));
        return [...prev, ...newItems];
      });
    }
  }, [animeData, animePage]);

  // Accumulate movie items for infinite scroll
  useEffect(() => {
    if (movieData?.items) {
      setAllMovieItems(prev => {
        // Reset on page 1 (new search/filter)
        if (moviePage === 1) return movieData.items;
        // Append new items for pagination
        const existingIds = new Set(prev.map(item => item.id));
        const newItems = movieData.items.filter(item => !existingIds.has(item.id));
        return [...prev, ...newItems];
      });
    }
  }, [movieData, moviePage]);

  // Reset pages when search query or filter type changes
  useEffect(() => {
    setAnimePage(1);
    setMoviePage(1);
    setAllAnimeItems([]);
    setAllMovieItems([]);
  }, [searchQuery, filters.type]);

  // Helper function to apply all filters and sorting
  const applyFiltersAndSort = (items: MediaItem[]): MediaItem[] => {
    let filtered = items;

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

    // Filter by release year
    if (filters.yearFrom !== 1900 || filters.yearTo !== new Date().getFullYear()) {
      filtered = filtered.filter((item) => {
        const itemYear = item.year || 0;
        return itemYear >= filters.yearFrom && itemYear <= filters.yearTo;
      });
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let compareValue = 0;

      switch (filters.sortBy) {
        case 'rating':
          compareValue = a.rating - b.rating;
          break;
        case 'releaseDate':
          const yearA = a.year || 0;
          const yearB = b.year || 0;
          compareValue = yearA - yearB;
          break;
        case 'popularity':
          // Using rating as a proxy for popularity since we don't have a separate popularity field
          compareValue = a.rating - b.rating;
          break;
      }

      return filters.sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return sorted;
  };

  // Apply filters and sorting to accumulated results
  const filteredResults = applyFiltersAndSort([
    ...(filters.type === 'all' || filters.type === 'anime' ? allAnimeItems : []),
    ...(filters.type === 'all' || filters.type === 'movie' ? allMovieItems : []),
  ]);

  const hasMoreAnime = animeData?.hasMore || false;
  const hasMoreMovies = movieData?.hasMore || false;

  // Handle loading more content
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Trigger load more when near bottom
      if (scrollTop + clientHeight >= scrollHeight - 200 && !loading && !isLoadingMore) {
        const shouldLoadAnime = (filters.type === 'all' || filters.type === 'anime') && hasMoreAnime;
        const shouldLoadMovies = (filters.type === 'all' || filters.type === 'movie') && hasMoreMovies;
        
        if (shouldLoadAnime || shouldLoadMovies) {
          setIsLoadingMore(true);
          
          // Load next page
          if (shouldLoadAnime) {
            setAnimePage(prev => prev + 1);
          }
          if (shouldLoadMovies) {
            setMoviePage(prev => prev + 1);
          }
          
          // Reset loading state after a delay
          setTimeout(() => setIsLoadingMore(false), 500);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, isLoadingMore, hasMoreAnime, hasMoreMovies, filters.type]);

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
            {loading && filteredResults.length === 0 ? (
              <Loader count={12} />
            ) : filteredResults.length > 0 ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
                </p>
                <CardList items={filteredResults} />
                {isLoadingMore && (
                  <div className="py-8">
                    <Loader count={6} />
                  </div>
                )}
                {!isLoadingMore && !hasMoreAnime && !hasMoreMovies && filteredResults.length > 0 && (
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
