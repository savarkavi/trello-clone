import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { Medal } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const MarketingPage = () => {
  const { userId, orgId } = auth();

  if (userId && orgId) {
    redirect(`/organization/${orgId}`);
  }

  if (userId && !orgId) {
    redirect("select-org");
  }

  return (
    <div className="h-full flex justify-center items-center bg-slate-100">
      <div className="flex flex-col items-center gap-4 max-w-[500px]">
        <div className="flex items-center gap-4 bg-amber-100 p-3 rounded-full text-amber-700">
          <Medal className="h-6 w-6" />
          <h1 className="text-lg md:text-xl lg:text-2xl uppercase">
            No. 1 Task Management App
          </h1>
        </div>
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
          Taskify helps team move
        </p>
        <div className="py-2 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-xl md:text-2xl lg:text-3xl text-white">
          work forward.
        </div>
        <div className="text-neutral-400 px-4 text-sm md:text-base text-center">
          <p>
            Collaborate, manage projects and reach new productivity peaks. From
            high rises to the home office, the way your team works is wunique -
            accomplish it all with Taskify
          </p>
        </div>
        <Button className="mt-8" asChild>
          <Link href="/sign-up">Get Taskify for free</Link>
        </Button>
      </div>
    </div>
  );
};

export default MarketingPage;
