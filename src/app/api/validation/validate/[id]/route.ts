import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/db';
import ValidationResult from '@/models/ValidationResult';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const result = await ValidationResult.findOneAndDelete({ _id: id, userId });
    if (!result) {
      return NextResponse.json({ success: false, message: "Report not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Validation report deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete validation report:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
