import mongoose from "mongoose";
import { MONGODB_URI } from "../pages/api/node-helpers";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI).then((mongo) => {
      return mongo;
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default dbConnect;
