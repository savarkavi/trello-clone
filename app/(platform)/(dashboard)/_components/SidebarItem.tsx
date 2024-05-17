import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface SidebarItemProps {
  isActive: boolean;
  isExpanded: boolean;
  onExpand: (id: string) => void;
  organization: Organization;
}

const SidebarItem = ({
  isActive,
  isExpanded,
  onExpand,
  organization,
}: SidebarItemProps) => {
  const routes = [
    {
      label: "Boards",
      icon: <Layout />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const pathname = usePathname();

  return (
    <AccordionItem value={organization.id} className="rounded-lg">
      <AccordionTrigger
        className={cn(
          "hover:bg-slate-100 p-2 hover:no-underline rounded-lg",
          isActive && !isExpanded && "bg-blue-500/20"
        )}
        onClick={() => onExpand(organization.id)}
      >
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-lg">
            <Image
              src={organization.imageUrl}
              alt="org image"
              fill
              className="rounded-lg"
            />
          </div>
          <span>{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-3 mt-4">
        {routes.map((route) => {
          return (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "flex items-center gap-4 py-3 px-16 hover:bg-slate-100 rounded-lg",
                pathname === route.href && "bg-blue-500/20",
                pathname.includes(`${route.href}/organization-members`) &&
                  "bg-blue-500/20"
              )}
            >
              {route.icon}
              <span>{route.label}</span>
            </Link>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};

export default SidebarItem;
