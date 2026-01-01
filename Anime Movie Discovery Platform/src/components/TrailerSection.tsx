import { Play } from 'lucide-react';

interface TrailerSectionProps {
  trailerKey: string | null;
  type: 'anime' | 'movie';
}

export function TrailerSection({ trailerKey, type }: TrailerSectionProps) {
  if (!trailerKey) {
    console.warn('No trailer available');
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Play className="h-5 w-5" />
        <h3>Trailer</h3>
      </div>
      <div className="w-full max-w-3xl mx-auto lg:mx-0">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg border border-border"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title={`${type} trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
