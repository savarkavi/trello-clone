"use server";

import prisma from "@/lib/db";
import { Card } from "@prisma/client";

interface updateCardOrderParams {
  items: Card[];
}

export const updateCardOrder = async ({ items }: updateCardOrderParams) => {
  try {
    const transaction = items.map((card) =>
      prisma.card.update({
        where: {
          id: card.id,
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    const cards = await prisma.$transaction(transaction);

    return JSON.parse(JSON.stringify({ success: true, cards }));
  } catch (error) {
    console.log(error);
  }
};
