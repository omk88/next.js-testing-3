"use server";

import z from "zod";
import { postSchema } from "./schemas/blog";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { fetchAuthMutation } from "@/lib/auth-server"; 
import { Id } from "@/convex/_generated/dataModel";
import { revalidatePath, updateTag } from "next/cache";

export async function createBlogAction(values: z.infer<typeof postSchema>) {
    const parsed = postSchema.safeParse(values);

    if (!parsed.success) {
        throw new Error("Something went wrong");
    }

    await fetchAuthMutation(api.posts.createPost, {
        title: parsed.data.title,
        body: parsed.data.content,
        imageStorageId: parsed.data.image ? (parsed.data.image as Id<"_storage">) : undefined
    }); 

    // revalidatePath("/blog")
    updateTag("blog");
    return { success: true };
}