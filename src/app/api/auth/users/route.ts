import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import InvestorProfile from '@/models/InvestorProfile';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({});
    
    const usersWithProfiles = await Promise.all(users.map(async (u) => {
      let profile = null;
      if (u.role === "investor") {
        profile = await InvestorProfile.findOne({ userId: u._id });
      }
      return {
        id: u._id,
        _id: u._id,
        name: u.name || u.fullName,
        fullName: u.fullName,
        email: u.email,
        role: u.role,
        clerkId: u.clerkId,
        status: u.role === "investor" ? (profile ? profile.status : "pending") : (u.status || "verified"),
        company: profile ? profile.company : "",
        investmentRange: profile ? profile.investmentRange : "",
        preferredDomains: profile ? profile.preferredDomains : []
      };
    }));

    return NextResponse.json({ success: true, data: usersWithProfiles });
  } catch (error: any) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
