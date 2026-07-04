import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import InvestorProfile from '@/models/InvestorProfile';

export async function GET(req: Request, { params }: { params: Promise<{ email: string }> }) {
  try {
    await connectDB();
    const { email } = await params;
    const decodedEmail = decodeURIComponent(email);

    const user = await User.findOne({ email: decodedEmail });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found in database" }, { status: 404 });
    }

    let currentStatus = user.status || "verified";
    if (user.role === "investor") {
      const investorProfile = await InvestorProfile.findOne({ userId: user._id });
      if (investorProfile) {
        currentStatus = investorProfile.status;
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        _id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        role: user.role,
        status: currentStatus,
      }
    });
  } catch (error: any) {
    console.error("Failed to query user by email:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
