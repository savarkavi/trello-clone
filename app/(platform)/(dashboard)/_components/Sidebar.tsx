"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import SidebarItem, { Organization } from "./SidebarItem";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import { useParams } from "next/navigation";

interface SidebarProps {
  storageKey?: string;
}

const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>(
    storageKey,
    {}
  );

  const params = useParams();

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  const {
    userMemberships,
    isLoaded: isLoadedOrgList,
    setActive,
  } = useOrganizationList({
    userMemberships: { infinite: true },
  });

  useEffect(() => {
    if (!setActive) return;
    setActive({ organization: params.organizationId as string });
  }, [params.organizationId, setActive]);

  const defaultAccordianVal = Object.keys(expanded).filter(
    (key) => expanded[key]
  );

  const onExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList) {
    return (
      <div className="w-[350px] p-8">
        <div className="flex items-center justify-between">
          <span>Workspaces</span>
          <Button variant="ghost" asChild>
            <Link href="/select-org">
              <Plus />
            </Link>
          </Button>
        </div>
        <div className="mt-8 flex flex-col gap-10">
          <Skeleton className="w-full h-14 rounded-lg bg-slate-200" />
          <Skeleton className="w-full h-14 rounded-lg bg-slate-200" />
          <Skeleton className="w-full h-14 rounded-lg bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 xl:mt-0 xl:p-8">
      <div className="flex items-center justify-between">
        <span>Workspaces</span>
        <Button variant="ghost" asChild>
          <Link href="/select-org">
            <Plus />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        className="mt-8 flex flex-col gap-4"
        defaultValue={defaultAccordianVal}
      >
        {userMemberships.data.map(({ organization }) => {
          return (
            <SidebarItem
              key={organization.id}
              isActive={activeOrganization?.id === organization.id}
              isExpanded={expanded[organization.id]}
              onExpand={onExpand}
              organization={organization as Organization}
            />
          );
        })}
      </Accordion>
    </div>
  );
};

export default Sidebar;
