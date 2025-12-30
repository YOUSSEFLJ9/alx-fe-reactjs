import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import FilterButtons from '../components/FilterButtons';
import { moviesAnimeData } from '../data/mockData';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredMovies = moviesAnimeData.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || movie.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4">Movie & Anime Collection</h1>
          <p className="text-center text-xl">Discover your next favorite movie or anime</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <FilterButtons selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />

        {filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-600">No results found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
