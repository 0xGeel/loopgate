import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import LogoBrandLight from "@/public/images/logo/loopgate-brand-light.svg";
import VersionTag from "./VersionTag";

const Header = () => {
  return (
    <div className="w-full flex py-3 px-4 sm:px-6 sticky top-0 items-center justify-between border-b sm:border-b-0 border-white/10 bg-slate-900/50 backdrop-blur-lg z-10">
      <div className="flex gap-4 items-center">
        <Image src={LogoBrandLight} alt="loopgate Logo" height={32} />
        <VersionTag url="https://github.com/0xGeel/loopgate" />
      </div>

      <ConnectKitButton />
    </div>
  );
};

export default Header;
