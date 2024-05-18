"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface updateBoardParams {
  boardId: string;
  title: string;
}

const updateBoardSchema = z
  .string({
    required_error: "Title is required",
    invalid_type_error: "Invalid field",
  })
  .min(3, {
    message: "Title should be atleast 3 characters long",
  });

export const updateBoard = async ({ boardId, title }: updateBoardParams) => {
  const validationRes = updateBoardSchema.safeParse(title);

  if (!validationRes.success) {
    return JSON.parse(JSON.stringify(validationRes));
  }

  if (!title) return;

  try {
    const updatedBoard = await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        title,
      },
    });

    revalidatePath(`/board/${boardId}`);
    return JSON.parse(JSON.stringify({ success: true, updatedBoard }));
  } catch (error) {
    console.log("Something went wrong");
  }
};
