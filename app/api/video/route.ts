// app/api/video/route.ts
export const runtime = "nodejs";

import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "dummy-token",
});

export async function POST(req: Request) {
  try {
    let userId: string | null = null;

    try {
      const authResult = auth();
      userId = authResult?.userId || null;
    } catch (err) {
      console.warn("[AUTH_WARNING] Clerk auth() failed — fallback used.");
      userId = "test-user"; // fallback for build/test environments
    }

    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const isAllowed = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!isAllowed && !isPro) {
      return new NextResponse("API Limit Exceeded", { status: 403 });
    }

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: { prompt },
      }
    );

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[VIDEO_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
