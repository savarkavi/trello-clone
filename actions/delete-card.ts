"use server";

import prisma from "@/lib/db";

export const deleteCard = async ({
  listId,
  cardId,
}: {
  listId: string;
  cardId: string;
}) => {
  try {
    await prisma.card.delete({
      where: {
        id: cardId,
        listId,
      },
    });
  } catch (error) {
    console.log("Something went wrong");
  }
};
