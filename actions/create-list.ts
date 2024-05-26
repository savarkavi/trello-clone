"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface CreateListParams {
  title: string;
  boardId: string;
}

const createListSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Invalid field",
  }),
});

export const createList = async ({ title, boardId }: CreateListParams) => {
  const validationRes = createListSchema.safeParse({
    title,
  });

  if (!validationRes.success) {
    return JSON.parse(JSON.stringify(validationRes));
  }

  try {
    const lastList = await prisma.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    const newList = await prisma.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
      include: {
        cards: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    revalidatePath(`/board/${boardId}`);
    return JSON.parse(JSON.stringify({ success: true, newList }));
  } catch (error) {
    console.log("Something went wrong");
  }
};
