"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface updateCardParams {
  cardId: string;
  title: string;
  description: string;
  boardId: string;
}

const updateCardSchema = z.string({
  required_error: "Title is required",
  invalid_type_error: "Invalid field",
});

export const updateCard = async ({
  cardId,
  title,
  description,
  boardId,
}: updateCardParams) => {
  const validationRes = updateCardSchema.safeParse(title);

  if (!validationRes.success) {
    return JSON.parse(JSON.stringify(validationRes));
  }

  if (!title) return;

  try {
    const updatedCard = await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        title,
        description,
      },
    });

    revalidatePath(`/board/${boardId}`);
    return JSON.parse(JSON.stringify({ success: true, updatedCard }));
  } catch (error) {
    console.log("Something went wrong");
  }
};
