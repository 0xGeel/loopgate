import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import LogoSrc from "@/public/images/logo/logo.svg";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full flex py-3 px-4 sm:px-6 sticky top-0 items-center justify-between border-b sm:border-b-0 border-white/10 bg-slate-900/50 backdrop-blur-lg md:bg-transparent md:backdrop-blur-0 z-10">
      <Link
        href="/"
        className="hover:opacity-80 duration-150 active:scale-95 active:opacity-70"
      >
        <Image src={LogoSrc} alt="LoopGate Logo" height={32} />
      </Link>

      <ConnectKitButton />
    </div>
  );
};

export default Header;
