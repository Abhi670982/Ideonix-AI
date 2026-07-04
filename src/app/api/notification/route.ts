import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import PitchRequest from '@/models/PitchRequest';
import User from '@/models/User';
import Startup from '@/models/Startup';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { founderId, investorId, startupId } = await req.json();
    const newRequest = new PitchRequest({
      founderId,
      investorId,
      startupId
    });
    await newRequest.save();
    return NextResponse.json({ success: true, data: newRequest }, { status: 210 });
  } catch (error: any) {
    console.error("Failed to create pitch request:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const role = searchParams.get('role');

    if (!userId || !role) {
      return NextResponse.json({ success: false, message: "userId and role are required" }, { status: 400 });
    }

    let query: any = {};
    if (role === "founder") {
      query.founderId = userId;
    } else if (role === "investor") {
      query.investorId = userId;
    } else {
      return NextResponse.json({ success: false, message: "Invalid role specified" }, { status: 400 });
    }

    const requests = await PitchRequest.find(query)
      .populate('founderId', 'name email')
      .populate('investorId', 'name email company')
      .populate('startupId', 'name summary domain problem solution validationScore');

    return NextResponse.json({ success: true, data: requests });
  } catch (error: any) {
    console.error("Failed to query pitch requests:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
