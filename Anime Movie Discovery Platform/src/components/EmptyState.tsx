import { Search, Heart } from 'lucide-react';

interface EmptyStateProps {
  type?: 'search' | 'favorites';
  message?: string;
}

export function EmptyState({ type = 'search', message }: EmptyStateProps) {
  const Icon = type === 'favorites' ? Heart : Search;
  const defaultMessage =
    type === 'favorites'
      ? 'No favorites yet. Start adding anime and movies you love!'
      : 'No results found. Try adjusting your search or filters.';

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Icon className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="mb-2">
        {type === 'favorites' ? 'No Favorites Yet' : 'No Results Found'}
      </h3>
      <p className="text-muted-foreground max-w-md">
        {message || defaultMessage}
      </p>
    </div>
  );
}
