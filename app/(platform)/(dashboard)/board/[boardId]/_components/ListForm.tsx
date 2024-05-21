"use client";

import { createList } from "@/actions/create-list";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoaderCircle, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const ListForm = ({ boardId }: { boardId: string }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createList({ title, boardId });

      if (!res.success) {
        return toast.error(res.error.issues[0].message);
      }

      setTitle("");
      toast.success("New List created");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsFormOpen(false);
    }
  };

  return (
    <Popover open={isFormOpen} onOpenChange={setIsFormOpen}>
      <PopoverTrigger>
        <div className="bg-slate-100 py-3 pl-2 pr-20 rounded-lg flex items-center gap-2 font-semibold w-[250px]">
          <Plus className="w-4" />
          Add a list
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input
            placeholder="type here..."
            className="outline-none border p-2 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            type="submit"
            className="mt-8 flex items-center justify-center"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Add"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListForm;
