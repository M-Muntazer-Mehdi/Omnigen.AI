// app/api/music/route.js

// This line forces the route to be dynamically rendered at request time,
// preventing Next.js from trying to statically optimize it during build,
// which often causes issues with authentication contexts.
export const dynamic = 'force-dynamic';

// Import necessary modules for the API route
import { auth } from "@clerk/nextjs"; // Using @clerk/nextjs for server-side auth in App Router
import { NextResponse, NextRequest } from "next/server"; // Import NextRequest for typing
import Replicate from "replicate";

// Import custom utility functions for API limit and subscription checks
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Initialize Replicate API client with the API token from environment variables
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

// GET method remains as a placeholder or for other retrieval logic if needed
export async function GET(request: NextRequest) { // Added NextRequest type for the 'request' parameter
  try {
    // Attempt to retrieve the userId from the Clerk authentication context.
    // This function will only correctly resolve during a live request.
    const { userId } = auth();

    // If no userId is found (e.g., user is not authenticated), return an unauthorized response.
    if (!userId) {
      console.warn("Unauthorized access attempt to /api/music: No userId found.");
      return new Response("Unauthorized", { status: 401 });
    }

    // --- Your existing music retrieval logic goes here ---
    // For demonstration, let's return a placeholder success message.
    console.log(`Access granted for user: ${userId} to /api/music (GET request)`);
    return new Response(JSON.stringify({ message: `Music data for user ${userId}` }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    // Catch any errors that might occur during authentication or logic execution.
    // Log the error for debugging purposes.
    console.error("Error in /api/music GET API route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// POST method for music generation using Replicate
export async function POST(req: Request) {
  try {
    // Get the authenticated user ID from Clerk
    const { userId } = auth();
    // Parse the request body to get the prompt
    const body = await req.json();
    const { prompt } = body;

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate if the prompt is provided
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    // Check API limit and subscription status
    const isAllowed = await checkApiLimit();
    const isPro = await checkSubscription();

    // If API limit is exceeded and user is not a pro subscriber, return 403
    if (!isAllowed && !isPro) {
      return new NextResponse("API Limit Exceeded", { status: 403 });
    }

    // Call the Replicate API to generate music based on the prompt
    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    // If the user is not a pro subscriber, increase their API limit usage
    if (!isPro) {
      await increaseApiLimit();
    }

    // Return the Replicate API response as JSON
    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    // Log any errors that occur during the POST request
    console.error("[MUSIC_ERROR]", error);
    // Return a generic internal server error response
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
