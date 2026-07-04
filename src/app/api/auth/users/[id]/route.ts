import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import InvestorProfile from '@/models/InvestorProfile';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Apply updates
    if (body.status !== undefined) {
      user.status = body.status;
    }
    
    // Support updating other profile info if provided
    Object.keys(body).forEach((key) => {
      if (key !== 'status' && key !== '_id' && key !== 'id') {
        (user as any)[key] = body[key];
      }
    });

    await user.save();

    if (user.role === "investor") {
      const investorProfile = await InvestorProfile.findOne({ userId: user._id });
      if (investorProfile) {
        if (body.status !== undefined) {
          investorProfile.status = body.status;
        }
        if (body.company !== undefined) {
          investorProfile.company = body.company;
        }
        if (body.investmentRange !== undefined) {
          investorProfile.investmentRange = body.investmentRange;
        }
        if (body.preferredDomains !== undefined) {
          investorProfile.preferredDomains = body.preferredDomains;
        }
        await investorProfile.save();
      }
    }

    return NextResponse.json({ success: true, message: "User updated successfully", user });
  } catch (error: any) {
    console.error("Failed to update user:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
