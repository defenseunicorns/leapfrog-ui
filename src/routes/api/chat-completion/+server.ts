import OpenAI from 'openai';
import type { RequestEvent } from '@sveltejs/kit';
import {env} from "$env/dynamic/private";

let openai = undefined;

/** @type {import('./$types').RequestHandler} */
export async function POST(event: RequestEvent) {
    // This load the openai client at runtime to prevent a compile time dependency on the environment variables
    if (openai === undefined) {
        openai = new OpenAI({
            apiKey: env.OPENAI_API_KEY,
            baseURL: env.OPENAI_API_HOST
        });
    }

    try {
        const data = await event.request.json()
        const messages = data["messages"];

        // Make a request to OpenAI's Chat Completion API
        const chatCompletion = await openai.chat.completions.create({
            messages: messages,
            model: data["model"],
            temperature: data["temperature"],
            max_tokens: data["max_tokens"],
            stream: true
        });

        const body = new ReadableStream({
            async pull(controller) {
                for await (const part of chatCompletion) {
                    const content = part.choices[0]['delta'].content;
                    controller.enqueue(content || '');
                }
                controller.close();
            }
        });

        return new Response(body, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain'
            },
        });

        // console.log(llmResponse.data)
    } catch (error) {
        console.error(error);

        return new Response('Internal Server Error', {
            status: 500,
        })
    }
}