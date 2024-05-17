import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" width={32} height={32} alt="logo" />
        <h1 className="font-semibold">Taskify</h1>
      </div>
    </Link>
  );
};

export default Logo;
