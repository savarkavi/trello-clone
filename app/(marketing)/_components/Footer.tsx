import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="p-4 bg-white shadow-2xl h-14">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between h-full">
        <Logo />
        <div className="text-sm flex gap-4">
          <p>Privacy policy</p>
          <p>Term of Service</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
