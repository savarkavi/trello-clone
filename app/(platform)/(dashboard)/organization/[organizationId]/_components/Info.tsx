"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

const Info = () => {
  const { organization } = useOrganization();

  if (!organization) {
    return (
      <div className="flex gap-3">
        <Skeleton className="w-16 h-16 rounded-lg bg-slate-300" />
        <div className="flex flex-col gap-4">
          <Skeleton className="w-24 h-4 rounded-md bg-slate-300" />
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-4 rounded-md bg-slate-300" />
            <Skeleton className="w-8 h-4 rounded-md bg-slate-300" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="relative w-16 h-16 rounded-lg">
        <Image
          src={organization.imageUrl}
          alt="organization img"
          fill
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold">{organization.name}</h2>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <CreditCard />
          <span>Free</span>
        </div>
      </div>
    </div>
  );
};

export default Info;
