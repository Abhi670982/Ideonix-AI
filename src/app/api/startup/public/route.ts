import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Startup from '@/models/Startup';
import User from '@/models/User'; // Import User schema to register populated founderId relation

export async function GET() {
  try {
    await connectDB();
    // In Next.js App Router/Mongoose we populate the founderId field
    const startups = await Startup.find({ isPublic: true }).populate('founderId', 'name email');
    return NextResponse.json({ success: true, data: startups });
  } catch (error: any) {
    console.error("Failed to query public startups:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
