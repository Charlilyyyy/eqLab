'use server';

import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import AlertModel from '@/database/models/alert.model';
import Watchlist from '@/database/models/watchlist.model';
import { connectToDatabase } from '@/database/mongoose';
import { getCurrentUser } from '@/lib/better-auth/session';

import { getStocksDetails } from './finnhub.actions';

export async function getWatchlistSymbolsByEmail(email: string) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('Database connection failed');

    const usersCollection = db.collection('user');
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return [];
    }

    const watchlist = await Watchlist.find(
      { userId: user._id?.toString() },
      'symbol'
    ).lean();

    return watchlist.map((item) => item.symbol);
  } catch (error) {
    console.error(`Error fetching watchlist symbols for ${email}:`, error);
    return [];
  }
}

export async function addToWatchlist(symbol: string, company: string) {
  try {
    const user = await getCurrentUser();
    if (!user) redirect('/sign-in');

    const existingItem = await Watchlist.findOne({
      userId: user.id,
      symbol: symbol.toUpperCase(),
    });

    if (existingItem) {
      return { success: false, error: 'Stock already in watchlist' };
    }

    const newItem = new Watchlist({
      userId: user.id,
      symbol: symbol.toUpperCase(),
      company: company.trim(),
    });

    await newItem.save();
    revalidatePath('/watchlist');

    return { success: true, message: 'Stock added to watchlist' };
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    throw new Error('Failed to add stock to watchlist');
  }
}

export async function removeFromWatchlist(symbol: string) {
  try {
    const user = await getCurrentUser();
    if (!user) redirect('/sign-in');

    await Watchlist.deleteOne({
      userId: user.id,
      symbol: symbol.toUpperCase(),
    });

    await AlertModel.updateMany(
      {
        userId: user.id,
        symbol: symbol.toUpperCase(),
        isActive: true,
      },
      { $set: { isActive: false } }
    );

    revalidatePath('/watchlist');

    return { success: true, message: 'Stock removed from watchlist' };
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    throw new Error('Failed to remove stock from watchlist');
  }
}

export async function getUserWatchlist() {
  try {
    const user = await getCurrentUser();
    if (!user) redirect('/sign-in');

    const watchlist = await Watchlist.find({ userId: user.id })
      .sort({ addedAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(watchlist));
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    throw new Error('Failed to fetch watchlist');
  }
}

export async function getWatchlistWithData() {
  try {
    const user = await getCurrentUser();
    if (!user) redirect('/sign-in');

    const watchlist = await Watchlist.find({ userId: user.id })
      .sort({ addedAt: -1 })
      .lean();

    if (watchlist.length === 0) return [];

    const stocksWithData = await Promise.all(
      watchlist.map(async (item) => {
        try {
          const stockData = await getStocksDetails(item.symbol);

          return {
            company: stockData.company,
            symbol: stockData.symbol,
            currentPrice: stockData.currentPrice,
            priceFormatted: stockData.priceFormatted,
            changeFormatted: stockData.changeFormatted,
            changePercent: stockData.changePercent,
            marketCap: stockData.marketCapFormatted,
            peRatio: stockData.peRatio,
          };
        } catch (error) {
          console.warn(`Failed to fetch data for ${item.symbol}:`, error);
          return item;
        }
      })
    );

    return JSON.parse(JSON.stringify(stocksWithData));
  } catch (error) {
    console.error('Error loading watchlist:', error);
    throw new Error('Failed to fetch watchlist');
  }
}
