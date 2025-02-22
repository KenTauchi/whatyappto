"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getDBUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function createPost(content: string) {
  const userId = await getDBUserId();

  try {
    const post = await prisma.post.create({
      data: {
        authorId: userId,
        content,
      },
    });
    revalidatePath("/"); // revalidate the path to update the posts
    return { success: true, data: post };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create post" };
  }
}

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: posts };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to get posts" };
  }
}
