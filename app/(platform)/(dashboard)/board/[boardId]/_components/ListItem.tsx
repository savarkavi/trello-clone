"use client";

import { Card } from "@prisma/client";
import CardForm from "./CardForm";
import { ListWithCards } from "./ListContainer";
import ListOptions from "./ListOptions";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import CardItem from "./CardItem";

const ListItem = ({ list, index }: { list: ListWithCards; index: number }) => {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          className="bg-slate-200 rounded-lg font-semibold w-[300px] flex flex-col"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="py-3 px-4 flex items-center justify-between gap-2">
            <div>{list.title}</div>
            <ListOptions list={list} />
          </div>
          <Droppable droppableId={list.id} type="card">
            {(provided) => (
              <div
                className="p-3 flex flex-col gap-3"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.cards.map((card: Card, i) => (
                  <CardItem key={card.id} card={card} index={i} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <CardForm list={list} />
        </div>
      )}
    </Draggable>
  );
};

export default ListItem;
