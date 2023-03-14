import LoopGateLogo from "@/public/images/icon/icon.svg";
import Image from "next/image";

const ShinyLogo = () => (
  <div className="w-full flex justify-center -mt-8 select-none">
    <Image src={LoopGateLogo} alt="LoopGate Icon" height={60} />
    <Image
      className="absolute blur-lg animate-pulse"
      src={LoopGateLogo}
      alt="LoopGate Icon"
      height={60}
    />
  </div>
);

export default ShinyLogo;
