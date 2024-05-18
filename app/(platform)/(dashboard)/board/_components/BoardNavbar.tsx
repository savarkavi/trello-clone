"use client";

import { Board } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateBoard } from "@/actions/update-board";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

const BoardNavbar = ({ boardData }: { boardData: Board }) => {
  const [title, setTitle] = useState(boardData.title);

  const updateBoardTitle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await updateBoard({ boardId: boardData.id, title });

      if (!res.success) {
        return toast.error(res.error.issues[0].message);
      }

      toast.success("Board title updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black/50 h-16 px-4 xl:px-8 text-white flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="hover:bg-slate-600/40 p-2 rounded-lg">
            <span className="font-semibold">{boardData.title}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <form className="flex flex-col gap-2" onSubmit={updateBoardTitle}>
            <label htmlFor="title" className="font-semibold">
              Change Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent outline-none border border-black p-2 rounded-lg text-black"
            />
            <Button>Save</Button>
          </form>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <MenuIcon />
        </PopoverTrigger>
      </Popover>
    </div>
  );
};

export default BoardNavbar;
