import { auth } from "@clerk/nextjs";

// Commented out constants and Prisma
// import { MAX_FREE_COUNTS } from "@/constants";
// import prismadb from "./prismadb";

// 🔧 In-memory store to simulate DB
const mockApiLimitStore: Record<string, number> = {};

export const increaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) return;

  if (!mockApiLimitStore[userId]) {
    mockApiLimitStore[userId] = 1;
  } else {
    mockApiLimitStore[userId]++;
  }

  console.log(`API Count for ${userId}:`, mockApiLimitStore[userId]);
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const count = mockApiLimitStore[userId] ?? 0;

  // ✅ Set any fake limit you want
  const MAX_FREE_COUNTS = 5;

  return count < MAX_FREE_COUNTS;
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) return 0;

  return mockApiLimitStore[userId] ?? 0;
};
