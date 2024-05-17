"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface CreateBoardParams {
  orgId: string;
  title: string;
  imageUrl: string | null;
}

const createBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Invalid field",
    })
    .min(3, {
      message: "Title should be atleast 3 characters long",
    }),
  imageUrl: z.string({
    required_error: "Please select an image",
    invalid_type_error: "Please select an image",
  }),
});

export const createBoard = async ({
  orgId,
  title,
  imageUrl,
}: CreateBoardParams) => {
  const validationRes = createBoardSchema.safeParse({
    title,
    imageUrl,
  });

  if (!validationRes.success) {
    return JSON.parse(JSON.stringify(validationRes));
  }

  if (!imageUrl || !title) return;

  try {
    const board = await prisma.board.create({
      data: {
        orgId,
        title,
        imageUrl,
      },
    });

    revalidatePath("/organization/org_2gPHL0uvWgcVHO4mI1B1iwsEwAB");
    return JSON.parse(JSON.stringify({ success: true, board }));
  } catch (error) {
    console.log("Something went wrong");
  }
};
