import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="p-4 bg-white h-16">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between h-full border-b">
        <Logo />
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
