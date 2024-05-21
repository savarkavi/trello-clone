"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal, Plus, Trash } from "lucide-react";
import { ListWithCards } from "./ListContainer";
import { deleteList } from "@/actions/delete-list";
import toast from "react-hot-toast";
import { FormEvent, useState } from "react";
import { updateList } from "@/actions/update-list";
import { cn } from "@/lib/utils";

const ListOptions = ({ list }: { list: ListWithCards }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [title, setTitle] = useState("");

  const onDeleteList = async (id: string) => {
    setDeleteLoading(true);
    try {
      await deleteList({ listId: id, boardId: list.boardId });
      toast.success("List deleted");
    } catch (error) {
      toast.error("Failed to delete the list");
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const res = await updateList({
        listId: list.id,
        title,
        boardId: list.boardId,
      });

      if (!res.success) {
        return toast.error(res.error.issues[0].message);
      }

      toast.success("List title changed");
      setTitle("");
    } catch (error) {
      toast.error("Failed to changed the title");
      console.log(error);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <MoreHorizontal />
      </PopoverTrigger>
      <PopoverContent className="p-0 mt-4">
        <div className="flex flex-col">
          <h2 className="text-center font-semibold my-4">List Actions</h2>
          <form className="flex flex-col gap-2 p-4" onSubmit={onFormSubmit}>
            <label htmlFor="title" className="font-semibold">
              rename title
            </label>
            <input
              id="title"
              className={cn(
                "border outline-none rounded-lg p-2",
                formLoading && "text-gray-400 bg-slate-100 cursor-not-allowed"
              )}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
          <div className="cursor-pointer hover:bg-slate-100 p-4 flex items-center gap-2">
            <Plus className="w-4" />
            Add a card...
          </div>
          <Separator />
          <div
            className="cursor-pointer hover:bg-slate-100 p-4 flex items-center gap-2"
            onClick={() => onDeleteList(list.id)}
          >
            <Trash className="w-4" />
            {deleteLoading ? (
              <span className="text-gray-500">deleting</span>
            ) : (
              "Delete List..."
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
