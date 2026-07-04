import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { generateRoadmap } from '@/services/openaiService';
import Roadmap from '@/models/Roadmap';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { idea, domain, stage, startupId } = await req.json();

    if (!idea) {
      return NextResponse.json({ success: false, message: "Idea is required" }, { status: 400 });
    }

    const aiResult = await generateRoadmap(idea, domain, stage);

    if (startupId) {
      const roadmapDoc = new Roadmap({
        startupId,
        timeline: aiResult.timeline,
        phases: aiResult.phases
      });
      await roadmapDoc.save();
    }

    return NextResponse.json({ success: true, data: aiResult });
  } catch (error: any) {
    console.error("ROADMAP ERROR:", error);
    return NextResponse.json({
      success: false,
      message: "AI roadmap failed",
      data: {
        timeline: "Unknown",
        phases: []
      }
    }, { status: 500 });
  }
}
