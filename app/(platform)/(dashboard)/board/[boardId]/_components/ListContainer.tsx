import { Card, List } from "@prisma/client";
import ListForm from "./ListForm";

type ListWithCards = List & { cards: Card[] };

interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}

const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  return (
    <div>
      <ListForm boardId={boardId} />
    </div>
  );
};

export default ListContainer;
