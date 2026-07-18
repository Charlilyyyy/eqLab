'use client';

import { Star, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import {
  addToWatchlist,
  removeFromWatchlist,
} from '@/lib/actions/watchlist.actions';
import { cn } from '@/lib/utils';

export function WatchlistButton({
  symbol,
  company,
  isInWatchlist,
  showTrashIcon = false,
  type = 'icon',
  onWatchlistChange,
}: WatchlistButtonProps) {
  const [isAdded, setIsAdded] = useState(isInWatchlist);

  const toggleWatchlist = async () => {
    const result = isAdded
      ? await removeFromWatchlist(symbol)
      : await addToWatchlist(symbol, company);

    if (result.success) {
      toast.success(isAdded ? 'Removed from watchlist' : 'Added to watchlist', {
        description: `${company} ${
          isAdded ? 'removed from' : 'added to'
        } your watchlist`,
      });

      onWatchlistChange?.(symbol, !isAdded);
    }
  };

  const debouncedToggle = useDebounce(toggleWatchlist, 300);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setIsAdded(!isAdded);
    debouncedToggle();
  };

  if (type === 'icon') {
    return (
      <Button
        onClick={handleWatchlistToggle}
        variant="ghost"
        className={cn('watchlist-icon-btn', {
          'watchlist-icon-added': isAdded,
        })}
      >
        <div
          className={cn('watchlist-icon', {
            'bg-yellow-500/10!': isAdded && !showTrashIcon,
          })}
        >
          {!showTrashIcon && (
            <Star
              className={cn('star-icon', { 'text-yellow-500!': isAdded })}
              fill={isAdded ? 'currentColor' : 'none'}
            />
          )}
          {showTrashIcon && <Trash2 className="trash-icon" />}
        </div>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleWatchlistToggle}
      variant="ghost"
      className={cn('watchlist-btn', { 'watchlist-remove': isAdded })}
    >
      {isAdded ? 'Remove from watchlist' : 'Add to watchlist'}
    </Button>
  );
}
