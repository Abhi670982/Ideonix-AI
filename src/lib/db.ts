import mongoose from 'mongoose';
import dns from 'dns';

let isConnected = false;

export const connectDB = async (): Promise<typeof mongoose | undefined> => {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('Reusing existing MongoDB connection');
    return mongoose;
  }

  const mongoURI = process.env.MONGO_URL || "mongodb://localhost:27017/ideonixAI";

  if (mongoURI.startsWith("mongodb+srv://")) {
    const match = mongoURI.match(/@([^/?]+)/);
    const hostname = match ? match[1] : null;

    if (hostname) {
      console.log(`Checking connectivity to remote MongoDB host: ${hostname}...`);
      try {
        await Promise.race([
          new Promise<void>((resolve, reject) => {
            dns.lookup(hostname, (err) => {
              if (err) reject(err);
              else resolve();
            });
          }),
          new Promise<void>((_, reject) => setTimeout(() => reject(new Error("DNS Timeout")), 3000))
        ]);

        console.log("Remote host resolved. Connecting to MongoDB Atlas...");
        const db = await mongoose.connect(mongoURI, {
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 10000,
        });
        isConnected = true;
        console.log("✅ MongoDB connected to Atlas");
        return db;
      } catch (err: any) {
        console.warn(`Atlas connection failed (${err.message}). Falling back to local MongoDB...`);
      }
    }
  }

  try {
    const db = await mongoose.connect("mongodb://localhost:27017/ideonixAI");
    isConnected = true;
    console.log("✅ MongoDB connected to local database");
    return db;
  } catch (localErr: any) {
    console.error("❌ Local MongoDB connection failed:", localErr.message);
    throw localErr;
  }
};
