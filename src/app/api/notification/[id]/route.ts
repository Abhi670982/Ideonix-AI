import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import PitchRequest from '@/models/PitchRequest';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const { status } = await req.json();

    if (!["accepted", "rejected", "pending"].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
    }

    const updatedRequest = await PitchRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!updatedRequest) {
      return NextResponse.json({ success: false, message: "Request not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedRequest });
  } catch (error: any) {
    console.error("Failed to update request status:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
