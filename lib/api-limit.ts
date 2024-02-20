import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";
import { checkSubscription } from "./subscription";

export const increaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) return;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: {
        userId,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: {
        userId,
        count: 1,
      },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  return !userApiLimit || userApiLimit.count < MAX_FREE_COUNTS;
};

export const checkUserLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    const error = new Error("UnAuthorized");
    error.name = "401";
    throw error;
  }

  const freeTrial = await checkApiLimit();
  const isPro = await checkSubscription();
  if (!freeTrial && !isPro) {
    const error = new Error("You have reached the free trial limit");
    error.name = "403";
    throw error;
  }

  if (!isPro) {
    await increaseApiLimit();
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) return 0;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  return userApiLimit?.count || 0;
};
