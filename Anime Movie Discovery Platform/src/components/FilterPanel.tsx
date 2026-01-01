import { useState } from 'react';
import { FilterOptions } from '../types';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { allGenres } from '../types/index';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const currentYear = new Date().getFullYear();
  const yearRange = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleGenreChange = (value: string) => {
    onFilterChange({ ...filters, genre: value });
  };

  const handleRatingChange = (value: string) => {
    onFilterChange({ ...filters, rating: value });
  };

  const handleTypeChange = (value: string) => {
    onFilterChange({ ...filters, type: value as FilterOptions['type'] });
  };

  const handleYearFromChange = (value: string) => {
    onFilterChange({ ...filters, yearFrom: value ? parseInt(value) : 1900 });
  };

  const handleYearToChange = (value: string) => {
    onFilterChange({ ...filters, yearTo: value ? parseInt(value) : currentYear });
  };

  const handleSortByChange = (value: string) => {
    onFilterChange({ ...filters, sortBy: value as FilterOptions['sortBy'] });
  };

  const handleSortOrderChange = () => {
    onFilterChange({ ...filters, sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-border">
        <h3 className="font-semibold text-base">Filters & Sort</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="h-8 w-8 p-0"
        >
          {isOpen ? '−' : '+'}
        </Button>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-6">
          {/* Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="type-filter" className="text-sm font-medium">
              Type
            </Label>
            <Select value={filters.type} onValueChange={handleTypeChange}>
              <SelectTrigger id="type-filter" className="h-9">
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
            <Label htmlFor="genre-filter" className="text-sm font-medium">
              Genre
            </Label>
            <Select value={filters.genre} onValueChange={handleGenreChange}>
              <SelectTrigger id="genre-filter" className="h-9">
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
            <Label htmlFor="rating-filter" className="text-sm font-medium">
              Minimum Rating
            </Label>
            <Select value={filters.rating} onValueChange={handleRatingChange}>
              <SelectTrigger id="rating-filter" className="h-9">
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

          {/* Year Range Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Release Year</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">From</Label>
                <Select value={filters.yearFrom.toString()} onValueChange={handleYearFromChange}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1900">Any Year</SelectItem>
                    {yearRange.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">To</Label>
                <Select value={filters.yearTo.toString()} onValueChange={handleYearToChange}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {yearRange.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Sorting Options */}
          <div className="pt-2 border-t border-border space-y-3 mb-4">
            <Label htmlFor="sort-by" className="text-sm font-medium">
              Sort By
            </Label>
            <div className="flex gap-3">
              <Select value={filters.sortBy} onValueChange={handleSortByChange}>
                <SelectTrigger id="sort-by" className="h-9 flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="releaseDate">Release Date</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSortOrderChange}
                title={`Sort ${filters.sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                className="h-9 px-3"
              >
                {filters.sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
