"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface CreateCardParams {
  title: string;
  listId: string;
  boardId: string;
}

const createCardSchema = z.object({
  title: z.string({
    required_error: "Text is required",
    invalid_type_error: "Invalid field",
  }),
});

export const createCard = async ({
  title,
  listId,
  boardId,
}: CreateCardParams) => {
  const validationRes = createCardSchema.safeParse({
    title: title.length > 0 ? title : null,
  });

  if (!validationRes.success) {
    return JSON.parse(JSON.stringify(validationRes));
  }

  try {
    const lastCard = await prisma.card.findFirst({
      where: {
        listId,
      },
      orderBy: {
        order: "desc",
      },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    const newCard = await prisma.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });

    return JSON.parse(JSON.stringify({ success: true, newCard }));
  } catch (error) {
    console.log("Something went wrong");
  }
};
