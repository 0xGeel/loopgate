import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import LogoBrandLight from "@/public/images/logo/loopgate-brand-light.svg";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full flex py-3 px-4 sm:px-6 sticky top-0 items-center justify-between border-b sm:border-b-0 border-white/10 bg-slate-900/50 backdrop-blur-lg md:bg-transparent md:backdrop-blur-0 z-10">
      <Link href="/">
        <Image src={LogoBrandLight} alt="loopgate Logo" height={32} />
      </Link>

      <ConnectKitButton />
    </div>
  );
};

export default Header;
