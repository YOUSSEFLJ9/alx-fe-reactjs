import { MediaItem } from '../types';
import { MediaCard } from './MediaCard';

interface CardListProps {
  items: MediaItem[];
  title?: string;
}

export function CardList({ items, title }: CardListProps) {
  return (
    <div className="space-y-4">
      {title && <h2>{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <MediaCard key={`${item.type}-${item.id}`} media={item} />
        ))}
      </div>
    </div>
  );
}
