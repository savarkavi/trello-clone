"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface BoardProps {
  id: string;
  orgId: string;
  title: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const Board = ({ board }: { board: BoardProps }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link href={`/board/${board.id}`} key={board.id} className="cursor-pointer">
      <div className="relative w-full h-[150px] sm:w-[250px] 2xl:w-[300px] 2xl:h-[200px] rounded-lg">
        {!isLoaded && (
          <Skeleton className="w-full h-[150px] sm:w-[250px] 2xl:w-[300px] 2xl:h-[200px] rounded-lg bg-slate-300 absolute" />
        )}
        <Image
          src={board.imageUrl}
          alt="board image"
          fill
          className={cn(
            "object-cover rounded-lg",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
        />
        <div
          className={cn(
            "absolute bg-black/30 w-full h-full rounded-lg",
            !isLoaded && "hidden"
          )}
        ></div>
        {isLoaded && (
          <h2 className="absolute top-5 left-5 text-white font-semibold text-xl">
            {board.title}
          </h2>
        )}
      </div>
    </Link>
  );
};

export default Board;
