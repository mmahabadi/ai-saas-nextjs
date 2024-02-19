import { checkUserLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);

export async function POST(req: Request) {
  try {
    await checkUserLimit();

    const body = await req.json();
    const { prompt, amount = "1", resolution = "512x512" } = body;

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI Api key is not configured", {
        status: 500,
      });
    }

    if (!prompt) {
      return new NextResponse("prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("amount is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("resolution is required", { status: 400 });
    }

    // const response = await openai.createImage({
    //   model: "dall-e-3",
    //   prompt,
    //   n: parseInt(amount, 10),
    //   size: resolution,
    // });
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error && ["401", "403"].includes(error.name)) {
      return new NextResponse(error.message, { status: parseInt(error.name) });
    }
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
