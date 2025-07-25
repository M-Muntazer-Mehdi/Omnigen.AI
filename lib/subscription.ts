import { auth } from "@clerk/nextjs";

// Commented out the real DB import
// import prismadb from "./prismadb";

// Mock store to simulate user subscriptions
const mockUserSubscriptions: Record<string, { isPro: boolean }> = {
  "test-user-id-123": { isPro: true }, // Simulate a Pro user
  // Add more test users as needed
};

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) return false;

  // Simulate the subscription check
  const userSubscription = mockUserSubscriptions[userId];

  return !!userSubscription?.isPro;
};
