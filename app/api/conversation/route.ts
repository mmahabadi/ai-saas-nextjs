import { checkUserLimit } from "@/lib/api-limit";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);

export async function POST(req: Request) {
  try {
    await checkUserLimit();

    const body = await (req as any).json();
    const { messages } = body;

    if (!configuration.apiKey) {
      return Response.json(
        { error: "OpenAI Api key is not configured" },
        {
          status: 500,
        }
      );
    }

    if (!messages) {
      return Response.json(
        { error: "Messages are required" },
        {
          status: 400,
        }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return Response.json(response.choices[0].message);
  } catch (error) {
    if (error instanceof Error && ["401", "403"].includes(error.name)) {
      return new NextResponse(error.message, { status: parseInt(error.name) });
    }
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
