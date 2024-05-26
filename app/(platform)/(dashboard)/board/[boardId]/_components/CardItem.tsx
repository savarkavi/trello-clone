"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { updateCard } from "@/actions/update-card";
import toast from "react-hot-toast";

const CardItem = ({
  card,
  index,
  boardId,
}: {
  card: Card;
  index: number;
  boardId: string;
}) => {
  const [title, setTitle] = useState(card.title);
  const [desc, setDesc] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await updateCard({
        cardId: card.id,
        title,
        description: desc,
        boardId,
      });

      if (!res.success) {
        return toast.error(res.error.issues[0].message);
      }

      toast.success("Card Info updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <DialogTrigger>
            <div
              className="bg-white p-4 rounded-lg flex justify-start"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {card.title}
            </div>
          </DialogTrigger>
        )}
      </Draggable>
      <DialogContent>
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="cardTitle" className="font-semibold">
              Change Card title
            </label>
            <input
              required
              id="cardTitle"
              className="p-3 rounded-lg outline-none bg-transparent border border-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cardDesc" className="font-semibold">
              Description
            </label>
            <textarea
              rows={4}
              id="cardDesc"
              className="p-3 rounded-lg outline-none bg-transparent border border-black"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="mt-4 flex items-center gap-2 justify-between">
            <Button className="bg-red-500 hover:bg-red-600">Delete card</Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CardItem;
