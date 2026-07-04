import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import InvestorProfile from '@/models/InvestorProfile';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { clerkId, email, firstName, lastName, fullName, name, username, profileImage, role, company } = body;

    if (!clerkId || !email) {
      return NextResponse.json({ success: false, message: "clerkId and email are required" }, { status: 400 });
    }

    const resolvedFullName = fullName || name || `${firstName || ""} ${lastName || ""}`.trim() || "User";
    let user = await User.findOne({ $or: [{ clerkId }, { email }] });
    const now = new Date();

    if (!user) {
      user = new User({
        clerkId,
        email,
        firstName: firstName || "",
        lastName: lastName || "",
        fullName: resolvedFullName,
        name: resolvedFullName,
        username: username || undefined,
        profileImage: profileImage || "",
        role: role || "founder",
        status: role === "investor" ? "pending" : "verified",
        lastLoginAt: now,
      });
      await user.save();

      if (role === "investor" && company) {
        const newInvestorProfile = new InvestorProfile({
          userId: user._id,
          company,
          status: "pending",
        });
        await newInvestorProfile.save();
      }
    } else {
      let updated = false;

      if (!user.clerkId || user.clerkId !== clerkId) {
        user.clerkId = clerkId;
        updated = true;
      }
      if (email && user.email !== email) {
        user.email = email;
        updated = true;
      }
      if (firstName && user.firstName !== firstName) {
        user.firstName = firstName;
        updated = true;
      }
      if (lastName && user.lastName !== lastName) {
        user.lastName = lastName;
        updated = true;
      }
      if (resolvedFullName && user.fullName !== resolvedFullName) {
        user.fullName = resolvedFullName;
        user.name = resolvedFullName;
        updated = true;
      }
      if (username && user.username !== username) {
        user.username = username;
        updated = true;
      }
      if (profileImage && user.profileImage !== profileImage) {
        user.profileImage = profileImage;
        updated = true;
      }
      if (role && user.role !== role) {
        user.role = role;
        updated = true;
      }

      user.lastLoginAt = now;
      updated = true;

      if (updated) {
        await user.save();
      }

      if (user.role === "investor") {
        let investorProfile = await InvestorProfile.findOne({ userId: user._id });
        if (!investorProfile && company) {
          investorProfile = new InvestorProfile({
            userId: user._id,
            company,
            status: user.status || "pending",
          });
          await investorProfile.save();
        }
      }
    }

    let currentStatus = user.status || "verified";
    if (user.role === "investor") {
      const investorProfile = await InvestorProfile.findOne({ userId: user._id });
      if (investorProfile) {
        currentStatus = investorProfile.status;
        if (user.status !== currentStatus) {
          user.status = currentStatus;
          await user.save();
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Sync successful",
      user: {
        id: user._id,
        _id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        name: user.name,
        username: user.username,
        profileImage: user.profileImage,
        role: user.role,
        status: currentStatus,
        credits: user.credits,
        subscription: user.subscription,
        plan: user.plan,
        onboardingCompleted: user.onboardingCompleted,
        preferences: user.preferences,
        usage: user.usage,
        workspaces: user.workspaces,
        lastLoginAt: user.lastLoginAt,
      }
    });

  } catch (error: any) {
    console.error("Sync error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
