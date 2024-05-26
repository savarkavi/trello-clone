"use client";

import { Card, List } from "@prisma/client";
import ListForm from "./ListForm";
import ListItem from "./ListItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";

export type ListWithCards = List & { cards: Card[] };

interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);

  return result;
}

const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  const [listsData, setListsData] = useState(lists);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const items = reorder(listsData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setListsData(items);

      try {
        const updateOrder = async () => {
          await updateListOrder({ items, boardId });
        };
        updateOrder();
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "card") {
      let newListsData = [...listsData];

      const sourceList = newListsData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newListsData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) return;

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (!destList.cards) {
        destList.cards = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, i) => {
          card.order = i;
        });

        sourceList.cards = reorderedCards;

        setListsData(newListsData);
        try {
          const updateOrder = async () => {
            await updateCardOrder({ items: reorderedCards });
          };
          updateOrder();
        } catch (error) {
          console.log(error);
        }
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        movedCard.listId = destination.droppableId;

        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, i) => {
          card.order = i;
        });

        destList.cards.forEach((card, i) => {
          card.order = i;
        });

        setListsData(newListsData);
        try {
          const updateOrder = async () => {
            await updateCardOrder({ items: destList.cards });
          };
          updateOrder();
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const onListCreated = (newList: ListWithCards) => {
    setListsData([...listsData, newList]);
  };

  const onCardCreated = (newCard: Card) => {
    console.log(newCard);

    let listToUpdate = listsData.find((list) => list.id === newCard.listId);
    if (listToUpdate) {
      const updatedLists = listsData.filter((list) =>
        list.id === listToUpdate?.id
          ? { ...listToUpdate, cards: [...listToUpdate.cards, newCard] }
          : list
      );

      setListsData(updatedLists);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <div
            className="flex flex-wrap gap-8 h-full items-start"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {listsData.map((list, i) => (
              <ListItem
                key={list.id}
                list={list}
                index={i}
                boardId={boardId}
                onCardCreated={onCardCreated}
              />
            ))}
            {provided.placeholder}
            <ListForm boardId={boardId} onListCreated={onListCreated} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
