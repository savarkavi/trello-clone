"use client";

import { createCard } from "@/actions/create-card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoaderCircle, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { ListWithCards } from "./ListContainer";
import toast from "react-hot-toast";

const CardForm = ({ list }: { list: ListWithCards }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createCard({
        title,
        listId: list.id,
        boardId: list.boardId,
      });

      if (!res.success) {
        return toast.error(res.error.issues[0].message);
      }

      setTitle("");
      toast.success("New Card created");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsFormOpen(false);
    }
  };

  return (
    <Popover open={isFormOpen} onOpenChange={setIsFormOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 justify-start py-6 text-gray-700"
        >
          <Plus className="w-5" />
          <span className="text-base">Add a card</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
          <textarea
            required
            placeholder="type here..."
            rows={6}
            className="outline-none border p-2 rounded-lg text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" className="flex items-center justify-center">
            {loading ? <LoaderCircle className="animate-spin" /> : "Add"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default CardForm;
