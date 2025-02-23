import { Anthropic } from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      console.log("No message provided");
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{ role: "user", content: message }],
    });

    const content = response.content;

    // Assuming content can be an array of blocks
    if (Array.isArray(content) && content.length > 0) {
      const firstBlock = content[0];

      if ("text" in firstBlock) {
        return NextResponse.json({
          data: {
            content: firstBlock.text, // Access text safely
          },
        });
      } else {
        return NextResponse.json({ error: "No text found in response" }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: "Unexpected response format" }, { status: 500 });
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("401")) {
        return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
      }
      if (error.message.includes("429")) {
        return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
      }
    }

    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
