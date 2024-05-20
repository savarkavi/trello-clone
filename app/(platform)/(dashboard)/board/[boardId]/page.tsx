import prisma from "@/lib/db";
import ListContainer from "./_components/ListContainer";

const BoardIdPage = async ({ params }: { params: { boardId: string } }) => {
  const lists = await prisma.list.findMany({
    where: {
      boardId: params.boardId,
    },
    include: {
      cards: {
        orderBy: {
          order: "desc",
        },
      },
    },
    orderBy: {
      order: "desc",
    },
  });

  return (
    <div className="p-4 xl:p-8">
      <ListContainer lists={lists} boardId={params.boardId} />
    </div>
  );
};

export default BoardIdPage;
