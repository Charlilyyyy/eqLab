import mongoose from 'mongoose';

import { connectToDatabase } from './mongoose';
import Alert from './models/alert.model';
import Watchlist from './models/watchlist.model';
import {
  DEMO_USER_EMAIL,
  DEMO_USER_ID,
  SEED_ALERTS,
  SEED_WATCHLIST,
} from './seed-data';

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required. Copy .env.example to .env and set it.');
  }

  await connectToDatabase();

  const watchlistResult = await Watchlist.deleteMany({ userId: DEMO_USER_ID });
  const alertResult = await Alert.deleteMany({ userId: DEMO_USER_ID });

  const watchlistDocs = await Watchlist.insertMany(
    SEED_WATCHLIST.map((item) => ({
      userId: DEMO_USER_ID,
      symbol: item.symbol,
      company: item.company,
      addedAt: new Date(),
    }))
  );

  const alertDocs = await Alert.insertMany(
    SEED_ALERTS.map((item) => ({
      userId: DEMO_USER_ID,
      userEmail: DEMO_USER_EMAIL,
      symbol: item.symbol,
      company: item.company,
      alertName: item.alertName,
      alertType: item.alertType,
      threshold: item.threshold,
      isActive: item.isActive ?? true,
      createdAt: new Date(),
      lastSent: null,
    }))
  );

  console.log(`Removed ${watchlistResult.deletedCount} watchlist row(s).`);
  console.log(`Removed ${alertResult.deletedCount} alert row(s).`);
  console.log(`Inserted ${watchlistDocs.length} watchlist row(s).`);
  console.log(`Inserted ${alertDocs.length} alert row(s).`);
  console.log(`Demo user: ${DEMO_USER_ID} (${DEMO_USER_EMAIL})`);
}

seed()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Seed failed:', error);
    await mongoose.disconnect().catch(() => undefined);
    process.exit(1);
  });
