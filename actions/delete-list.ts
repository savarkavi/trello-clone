"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteList = async ({
  listId,
  boardId,
}: {
  listId: string;
  boardId: string;
}) => {
  try {
    await prisma.list.delete({
      where: {
        id: listId,
      },
    });

    revalidatePath(`/board/${boardId}`);
  } catch (error) {
    console.log("Something went wrong");
  }
};
