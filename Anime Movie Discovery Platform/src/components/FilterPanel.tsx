import { FilterOptions } from '../types';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { allGenres } from '../types/index';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const handleGenreChange = (value: string) => {
    onFilterChange({ ...filters, genre: value });
  };

  const handleRatingChange = (value: string) => {
    onFilterChange({ ...filters, rating: value });
  };

  const handleTypeChange = (value: string) => {
    onFilterChange({ ...filters, type: value as FilterOptions['type'] });
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-4">
      <h3>Filters</h3>

      {/* Type Filter */}
      <div className="space-y-2">
        <Label htmlFor="type-filter">Type</Label>
        <Select value={filters.type} onValueChange={handleTypeChange}>
          <SelectTrigger id="type-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="anime">Anime</SelectItem>
            <SelectItem value="movie">Movie</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Genre Filter */}
      <div className="space-y-2">
        <Label htmlFor="genre-filter">Genre</Label>
        <Select value={filters.genre} onValueChange={handleGenreChange}>
          <SelectTrigger id="genre-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {allGenres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rating Filter */}
      <div className="space-y-2">
        <Label htmlFor="rating-filter">Minimum Rating</Label>
        <Select value={filters.rating} onValueChange={handleRatingChange}>
          <SelectTrigger id="rating-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="9">9.0+</SelectItem>
            <SelectItem value="8.5">8.5+</SelectItem>
            <SelectItem value="8">8.0+</SelectItem>
            <SelectItem value="7.5">7.5+</SelectItem>
            <SelectItem value="7">7.0+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
