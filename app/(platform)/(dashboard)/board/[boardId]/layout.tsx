import prisma from "@/lib/db";
import BoardNavbar from "../_components/BoardNavbar";

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const board = await prisma.board.findUnique({
    where: {
      id: params.boardId,
    },
  });

  if (!board) return <div>loading...</div>;

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board?.imageUrl})` }}
    >
      <main className="h-full">
        <BoardNavbar boardData={board} />
        {children}
      </main>
    </div>
  );
};

export default BoardIdLayout;
