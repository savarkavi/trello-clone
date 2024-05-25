"use server";

import prisma from "@/lib/db";
import { List } from "@prisma/client";

interface updateListOrderParams {
  items: List[];
  boardId: string;
}

export const updateListOrder = async ({
  items,
  boardId,
}: updateListOrderParams) => {
  try {
    const transaction = items.map((list) =>
      prisma.list.update({
        where: {
          id: list.id,
          boardId,
        },
        data: {
          order: list.order,
        },
      })
    );

    const lists = await prisma.$transaction(transaction);

    return JSON.parse(JSON.stringify({ success: true, lists }));
  } catch (error) {
    console.log(error);
  }
};
