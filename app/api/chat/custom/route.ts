// @ts-nocheck
import { Database } from "@/supabase/types"
import { ChatSettings } from "@/types"
import { createClient } from "@supabase/supabase-js"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { ServerRuntime } from "next"
import OpenAI from "openai"
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs"
import { log } from "util"

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  console.log({ json })

  const { chatSettings, messages, customModelId } = json as {
    chatSettings: ChatSettings
    messages: any[]
    customModelId: string
  }

  try {
    const supabaseAdmin = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // const { data: customModel, error } = await supabaseAdmin
    //   .from("models")
    //   .select("*")
    //   .eq("id", customModelId)
    //   .single()

    // if (!customModel) {
    //   throw new Error(error.message)
    // }

    // const custom = new OpenAI({
    //   apiKey: customModel.api_key || "",
    //   baseURL: customModel.base_url
    // })

    // const response = await custom.chat.completions.create({
    //   model: chatSettings.model as ChatCompletionCreateParamsBase["model"],
    //   messages: messages as ChatCompletionCreateParamsBase["messages"],
    //   temperature: chatSettings.temperature,
    //   stream: true
    // })

    // const stream = OpenAIStream(response)

    const userInput = messages[messages.length - 1].content.toLowerCase().trim()
    // console.log({ userInput, m: hardcodedMessages[userInput] })

    const message =
      hardcodedMessages[userInput] ?? "I'm sorry, I don't understand that."
    const stream = createWordStream(message)

    return new StreamingTextResponse(stream)
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Custom API Key not found. Please set it in your profile settings."
    } else if (errorMessage.toLowerCase().includes("incorrect api key")) {
      errorMessage =
        "Custom API Key is incorrect. Please fix it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}

function createWordStream(text: string) {
  // Create an array of words by splitting the text
  const words = text.split(/\s+/)
  let index = 0

  // Create a new ReadableStream
  const stream = new ReadableStream({
    start(controller) {
      // Define a function to enqueue the next word
      function enqueueNextWord() {
        // If all words have been streamed, close the stream
        if (index >= words.length) {
          controller.close()
          return
        }

        // Enqueue the next word into the stream
        controller.enqueue(`${words[index]} `)
        index++
        const delay = Math.floor(Math.random() * (11 - 10 + 1)) + 100
        // Schedule the next word to be enqueued after one second
        setTimeout(enqueueNextWord, delay)
      }

      // Start streaming words
      enqueueNextWord()
    }
  })

  return stream
}

const hardcodedMessages = {
  "what is da value proposition":
    "DA's value proposition includes the opportunity to change lives by working with government, grow knowledge and skills, and receive competitive compensation and benefits.",
  "what is the salary scale for project leaders?":
    "The salary scale for Project Leaders at Delivery Associates is between $125,000 to $175,000 USD.",
  "should i book a flight in business class?":
    "Flights booked for client work that are longer than six hours can be booked in business class, otherwise, economy class is recommended."
} as const
