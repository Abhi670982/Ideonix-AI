import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Startup from '@/models/Startup';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const startup = await Startup.findByIdAndUpdate(id, body, { new: true });
    if (!startup) {
      return NextResponse.json({ success: false, message: "Startup not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: startup });
  } catch (error: any) {
    console.error("Failed to update startup:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    const startup = await Startup.findByIdAndDelete(id);
    if (!startup) {
      return NextResponse.json({ success: false, message: "Startup not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Startup deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete startup:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
