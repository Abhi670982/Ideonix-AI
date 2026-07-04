import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Startup from '@/models/Startup';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newStartup = new Startup(body);
    await newStartup.save();
    return NextResponse.json({ success: true, data: newStartup }, { status: 210 });
  } catch (error: any) {
    console.error("Failed to create startup:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const founderId = searchParams.get('founderId');

    if (founderId) {
      const startup = await Startup.findOne({ founderId });
      if (!startup) {
        return NextResponse.json({ success: false, message: "Startup not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: startup });
    }

    const startups = await Startup.find({});
    return NextResponse.json({ success: true, data: startups });
  } catch (error: any) {
    console.error("Failed to query startups:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
