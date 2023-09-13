import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

// GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response("Prompt not found", {satatus: 404});

        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response("Failed to fectch all prompts", {status: 500})
    }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();
        
        const existingPromt = await Prompt.findById(params.id);

        if(!existingPromt) return new Response("Prompt not found", {status: 404})
        existingPromt.prompt = prompt;
        existingPromt.tag = tag;
        
        await existingPromt.save();

        return new Response(JSON.stringify(existingPromt), {status: 200})
    } catch (error) {
        return new Response("Failed to Update Prompt", {status: 500})
    }
}

// DELETE (of course delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt delete succesfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 })
    }
}