import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/mongoose';

export async function GET() {
  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;

  if (!db) {
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    );
  }

  const alerts = await db.collection('alerts').find({ isActive: true }).toArray();

  return NextResponse.json(alerts);
}
