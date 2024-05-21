"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface updateListParams {
  listId: string;
  title: string;
  boardId: string;
}

const updateListSchema = z.string({
  required_error: "Title is required",
  invalid_type_error: "Invalid field",
});

export const updateList = async ({
  listId,
  title,
  boardId,
}: updateListParams) => {
  const validationRes = updateListSchema.safeParse(title);

  if (!validationRes.success) {
    return JSON.parse(JSON.stringify(validationRes));
  }

  if (!title) return;

  try {
    const updatedList = await prisma.list.update({
      where: {
        id: listId,
      },
      data: {
        title,
      },
    });

    revalidatePath(`/board/${boardId}`);
    return JSON.parse(JSON.stringify({ success: true, updatedList }));
  } catch (error) {
    console.log("Something went wrong");
  }
};
