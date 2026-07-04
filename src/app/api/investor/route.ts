import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import InvestorProfile from '@/models/InvestorProfile';
import User from '@/models/User'; // Populate ref user table

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');

    let query: any = { status: 'verified' };
    
    if (domain) {
      query.preferredDomains = { $in: [domain] };
    }

    const investors = await InvestorProfile.find(query).populate('userId', 'name email');
    return NextResponse.json({ success: true, data: investors });
  } catch (error: any) {
    console.error("Failed to query investors:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
