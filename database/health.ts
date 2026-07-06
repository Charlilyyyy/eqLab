import { connectToDatabase } from './mongoose';

export type DatabaseHealthResult = {
  ok: boolean;
  readyState: number;
  status: string;
  database?: string;
  collections?: string[];
  error?: string;
};

const READY_STATE_LABELS: Record<number, string> = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

export async function checkDatabaseHealth(): Promise<DatabaseHealthResult> {
  try {
    const mongoose = await connectToDatabase();
    const { connection } = mongoose;
    const db = connection.db;

    if (!db) {
      return {
        ok: false,
        readyState: connection.readyState,
        status: READY_STATE_LABELS[connection.readyState] ?? 'unknown',
        error: 'Database handle unavailable',
      };
    }

    await db.admin().ping();

    const collections = (await db.listCollections().toArray())
      .map((collection) => collection.name)
      .sort();

    return {
      ok: true,
      readyState: connection.readyState,
      status: READY_STATE_LABELS[connection.readyState] ?? 'unknown',
      database: db.databaseName,
      collections,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown database error';

    return {
      ok: false,
      readyState: 0,
      status: 'disconnected',
      error: message,
    };
  }
}
