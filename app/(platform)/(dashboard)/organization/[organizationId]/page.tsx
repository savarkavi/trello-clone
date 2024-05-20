import { Separator } from "@/components/ui/separator";
import Info from "./_components/Info";
import BoardsList from "./_components/BoardsList";
import { auth } from "@clerk/nextjs/server";

const OrganizationPage = async () => {
  const {} = auth();

  return (
    <div className="h-full w-full bg-slate-100 p-8 flex flex-col gap-8">
      <Info />
      <Separator className="bg-gray-400" />
      <BoardsList />
    </div>
  );
};

export default OrganizationPage;
