"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CardItem = ({ card, index }: { card: Card; index: number }) => {
  const [title, setTitle] = useState(card.title);
  const [desc, setDesc] = useState("");

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
        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="cardTitle" className="font-semibold">
              Change Card title
            </label>
            <input
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
        </form>
        <Button className="bg-red-500 hover:bg-red-600 mt-4">
          Delete card
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CardItem;
