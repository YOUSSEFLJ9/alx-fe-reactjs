import { useState, useEffect } from 'react';
import { MediaItem } from '../types';
import { MediaCard } from '../components/MediaCard';
import { EmptyState } from '../components/EmptyState';
import { Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<MediaItem[]>([]);
  const [showClearDialog, setShowClearDialog] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  };

  const clearAllFavorites = () => {
    localStorage.removeItem('favorites');
    setFavorites([]);
    setShowClearDialog(false);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1>My Favorites</h1>
            <p className="text-muted-foreground">
              {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>

          {favorites.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setShowClearDialog(true)}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {/* Content */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {favorites.map((item) => (
              <MediaCard key={`${item.type}-${item.id}`} media={item} />
            ))}
          </div>
        ) : (
          <EmptyState type="favorites" />
        )}

        {/* Clear All Confirmation Dialog */}
        <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear all favorites?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove all {favorites.length} items from your favorites.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={clearAllFavorites}>
                Clear All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
