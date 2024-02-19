import { checkUserLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);
const insrtuctionsMessage: ChatCompletionMessageParam = {
  role: "system",
  content:
    "You are a code generator. You must answer in markdown code snippets with instructions for developers. Use code comments for explanations.",
};

export async function POST(req: Request) {
  try {
    await checkUserLimit();

    const body = await req.json();
    const { messages } = body;

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI Api key is not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required.", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [insrtuctionsMessage, ...messages],
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    if (error instanceof Error && ["401", "403"].includes(error.name)) {
      return new NextResponse(error.message, { status: parseInt(error.name) });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
