import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import DialogForm from "@/components/DialogForm";

const Navbar = () => {
  return (
    <div className="sticky top-0 w-full py-4 px-4 xl:px-8 bg-white h-16 z-[99] border-b">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-4 lg:gap-8">
          <MobileSidebar />
          <div className="hidden xl:block">
            <Logo />
          </div>
          <DialogForm>
            <Button size="sm" className="md:hidden">
              <Plus width={16} height={16} />
            </Button>
          </DialogForm>
          <DialogForm>
            <Button size="sm" className="hidden md:block">
              Create
            </Button>
          </DialogForm>
        </div>
        <div className="flex items-center gap-4">
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl="/organization/:id"
            afterSelectOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/select-org"
          />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
