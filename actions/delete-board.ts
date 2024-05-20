"use server";

import prisma from "@/lib/db";

export const deleteBoard = async (boardId: string) => {
  try {
    await prisma.board.delete({
      where: {
        id: boardId,
      },
    });
  } catch (error) {
    console.log("Something went wrong");
  }
};
