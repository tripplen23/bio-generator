"use server";

import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import endent from "endent";

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY ?? "",
  baseURL: "https://api.groq.com/openai/v1",
});

const platformCharacterLimits: { [key: string]: number } = {
  Badoo: 500,
  Behance: 160,
  Discord: 190,
  Dribbble: 160,
  Facebook: 101,
  GitHub: 160,
  Instagram: 150,
  LinkedIn: 2600,
  Medium: 160,
  OnlyFans: 1000,
  Pinterest: 160,
  Reddit: 500,
  Snapchat: 80,
  Spotify: 1500,
  Steam: 160,
  Telegram: 70,
  Threads: 500,
  TikTok: 80,
  Tinder: 500,
  Tumblr: 160,
  Twitch: 300,
  Twitter: 160,
  Vimeo: 160,
  WeChat: 200,
  WhatsApp: 139,
  YouTube: 1000,
  Zalo: 150,
};

const systemPrompt = endent`
You are an AI assistant tasked with generating bios based on user input.

Instructions:

1. Analyze the User's Inputs:
  - Carefully review the provided tone and bio type.
  - Understand the user's core focus and primary activities.
  - Pay attention to the selected platform(s) to adapt with the platform concepts and respect the character limit.

2. Generate the Bio:

  - Create a bio that succinctly answers:
    - Who is the user?
    - What does the user do?
    - What can others expect from the user?
  - Reflect the given 'Bio Tone' and 'Bio Type' in the style and language of the bio. Do not explicitly mention the tone or type.
  - Respect the concept of chosen platform

3. Bio Requirements:
  - Use an informal and approachable tone.
  - Do not include hashtags or any words start with #.
  - Highlight the most important information about the user.
  - Avoid using too many buzzwords or overdoing humor.
  - Provide at least four different bio options.
  - Each bio must be clear, engaging, and respect the character limits of the chosen platform(s).
  - If 'Add Emojis' is true, include relevant emojis; if false, you must include any emojis.
  - The response must be in JSON format

Do not include any description, do not include the \`\`\`.
  Code (no \`\`\`):
  `;

export async function generateBio(
  input: string,
  temperature: number,
  model: string,
  platform: string
) {
  "use server";

  const characterLimit = platformCharacterLimits[platform] || 160;

  const {
    object: data,
    warnings,
    finishReason,
    rawResponse,
  } = await generateObject({
    model: groq(model),
    system: systemPrompt,
    prompt: input,
    temperature: temperature,
    maxTokens: 1024,
    schema: z.object({
      data: z.array(
        z.object({
          bio: z
            .string()
            .max(
              characterLimit,
              `Bio exceeds the character limit of ${platform}`
            )
            .describe("Add generated bio here!"),
        })
      ),
    }),
  });
  // console.log(warnings, finishReason, rawResponse);

  return { data };
}
