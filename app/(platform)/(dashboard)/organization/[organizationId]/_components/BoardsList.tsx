import { HelpCircle, User2 } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DialogForm from "@/components/DialogForm";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import Board from "./Board";

const BoardsList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await prisma.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center gap-3 font-semibold">
        <User2 className="w-6 h-6" />
        <span className="text-lg">Your Boards</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center items-center gap-6 w-full mt-8">
        {boards.map((board) => (
          <Board key={board.id} board={board} />
        ))}
        <DialogForm>
          <div className="flex flex-col items-center justify-between gap-2 w-full sm:w-[250px] h-[150px] 2xl:w-[300px] 2xl:h-[200px] px-6 pt-6 pb-2 rounded-lg bg-gray-200 cursor-pointer hover:bg-slate-200/70">
            <p className="font-semibold lg:text-xl">Create new Board</p>
            <span className="text-sm lg:text-base">5 remaining</span>
            <div className="self-end">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[250px]" side="bottom">
                    <p>
                      Free Worksapce can only have upto 5 boards. Upgrade to
                      premium for unlimited boards.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </DialogForm>
      </div>
    </div>
  );
};

export default BoardsList;
