import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/db';
import { validateIdea } from '@/services/openaiService';
import ValidationResult from '@/models/ValidationResult';
import Startup from '@/models/Startup';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, idea, domain, targetAudience, countryRegion, businessModel, additionalContext, startupId } = body;

    if (!idea || !domain) {
      return NextResponse.json({ success: false, message: "Idea description and domain are required" }, { status: 400 });
    }

    // Call OpenAI/Groq Service
    const aiResult = await validateIdea({
      title,
      idea,
      domain,
      targetAudience,
      countryRegion,
      businessModel,
      additionalContext,
      stage: "Idea"
    });
    
    // Save to Database
    const validationDoc = new ValidationResult({
      startupId: startupId || undefined,
      userId,
      title: title || "Untitled Project",
      idea,
      domain,
      stage: "Idea",
      score: aiResult.scores?.overall || aiResult.score || 70,
      targetAudience,
      countryRegion,
      businessModel,
      additionalContext,
      strengths: aiResult.swot?.strengths || aiResult.strengths || [],
      weaknesses: aiResult.swot?.weaknesses || aiResult.weaknesses || [],
      suggestions: aiResult.recommendations?.nextSteps || aiResult.suggestions || [],
      report: aiResult
    });
    await validationDoc.save();

    // Optionally update startup validation score
    if (startupId) {
      await Startup.findByIdAndUpdate(startupId, {
        validationScore: aiResult.scores?.overall || aiResult.score || 70
      });
    }

    return NextResponse.json({ success: true, data: validationDoc });
  } catch (error: any) {
    console.error("VALIDATION ERROR:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "AI validation failed",
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Fetch user's previous validations
    const validations = await ValidationResult.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: validations });
  } catch (error: any) {
    console.error("Failed to query validations:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
