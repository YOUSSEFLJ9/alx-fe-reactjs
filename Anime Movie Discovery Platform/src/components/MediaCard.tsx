import { Star, Play } from 'lucide-react';
import { MediaItem } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface MediaCardProps {
  media: MediaItem;
}

export function MediaCard({ media }: MediaCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/details/${media.type}/${media.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-lg overflow-hidden bg-card border border-border hover:border-primary/50 transition-all cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Poster Image */}
      <div className="aspect-[2/3] overflow-hidden bg-muted relative">
        <img
          src={media.posterUrl}
          alt={media.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="sm" className="gap-2">
            <Play className="h-4 w-4" />
            View Details
          </Button>
        </div>

        {/* Type Badge */}
        <Badge className="absolute top-2 right-2 capitalize">
          {media.type}
        </Badge>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-2">
        <h4 className="line-clamp-1" title={media.title}>
          {media.title}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-muted-foreground">{media.rating.toFixed(1)}</span>
          </div>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{media.year}</span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1">
          {media.genres.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="secondary">
              {genre}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
