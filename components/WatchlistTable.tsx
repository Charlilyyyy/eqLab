'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AlertModal } from '@/components/AlertModal';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { WatchlistButton } from '@/components/WatchlistButton';
import { WATCHLIST_TABLE_HEADER } from '@/lib/constants';
import { cn, getChangeColorClass } from '@/lib/utils';

export function WatchlistTable({ watchlist }: WatchlistTableProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockWithData | null>(
    null
  );

  const handleAlertClick = (e: React.MouseEvent, stock: StockWithData) => {
    e.stopPropagation();
    e.preventDefault();

    setSelectedStock(stock);
    setOpen(true);
  };

  return (
    <>
      <Table className="watchlist-table scrollbar-hide-default">
        <TableHeader>
          <TableRow className="table-header-row">
            {WATCHLIST_TABLE_HEADER.map((label) => (
              <TableHead className="table-header" key={label}>
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.map((item, index) => (
            <TableRow
              key={item.symbol + index}
              className="table-row"
              onClick={() =>
                router.push(`/stocks/${encodeURIComponent(item.symbol)}`)
              }
            >
              <TableCell className="table-cell pl-4">{item.company}</TableCell>
              <TableCell className="table-cell">{item.symbol}</TableCell>
              <TableCell className="table-cell">
                {item.priceFormatted || '—'}
              </TableCell>
              <TableCell
                className={cn(
                  'table-cell',
                  getChangeColorClass(item.changePercent)
                )}
              >
                {item.changeFormatted || '—'}
              </TableCell>
              <TableCell className="table-cell">
                {item.marketCap || '—'}
              </TableCell>
              <TableCell className="table-cell">{item.peRatio || '—'}</TableCell>
              <TableCell>
                <Button
                  className="add-alert"
                  onClick={(e) => handleAlertClick(e, item)}
                >
                  Add Alert
                </Button>
              </TableCell>
              <TableCell>
                <WatchlistButton
                  symbol={item.symbol}
                  company={item.company}
                  isInWatchlist
                  showTrashIcon
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {open && (
        <AlertModal
          open={open}
          setOpen={setOpen}
          alertData={{
            symbol: selectedStock?.symbol || '',
            company: selectedStock?.company || '',
            alertName: '',
            alertType: 'upper',
            threshold: selectedStock?.currentPrice?.toString() || '',
          }}
          action="create"
        />
      )}
    </>
  );
}
