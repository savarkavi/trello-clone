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
import { LoaderCircle, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteBoard } from "@/actions/delete-board";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const BoardNavbar = ({ boardData }: { boardData: Board }) => {
  const [title, setTitle] = useState(boardData.title);
  const [isUpdateTitleLoading, setIsUpdateTitleLoading] = useState(false);

  const router = useRouter();
  const { orgId } = useAuth();

  const updateBoardTitle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdateTitleLoading(true);

    try {
      const res = await updateBoard({ boardId: boardData.id, title });

      if (!res.success) {
        return toast.error(res.error.issues[0].message);
      }

      toast.success("Board title updated");
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdateTitleLoading(false);
    }
  };

  const removeBoard = async (id: string) => {
    try {
      await deleteBoard(id);
      toast.success("Board deleted");

      router.push(`/organization/${orgId}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the board");
    }
  };

  return (
    <div className="bg-black/50 h-16 px-4 xl:px-8 text-white flex items-center justify-between">
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
            <Button className="flex items-center justify-center">
              {isUpdateTitleLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </PopoverContent>
      </Popover>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Trash2 className="text-red-500 cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this board?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              board from our server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => removeBoard(boardData.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BoardNavbar;
