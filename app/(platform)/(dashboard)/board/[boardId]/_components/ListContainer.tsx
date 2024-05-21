import { Card, List } from "@prisma/client";
import ListForm from "./ListForm";
import ListItem from "./ListItem";

export type ListWithCards = List & { cards: Card[] };

interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}

const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {lists.map((list) => (
        <ListItem key={list.id} list={list} />
      ))}
      <ListForm boardId={boardId} />
    </div>
  );
};

export default ListContainer;
