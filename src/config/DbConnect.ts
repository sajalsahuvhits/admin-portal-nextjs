// src/lib/connect-to-database.ts
import mongoose from 'mongoose';

type Connection = { isConnected?: number };
const conn: Connection = {};

export async function connectToDatabase() {
  if (conn.isConnected) return;

  const db = await mongoose.connect(process.env.MONGODB_URL!);
  conn.isConnected = db.connections[0].readyState;
}
