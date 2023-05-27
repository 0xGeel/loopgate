import Image from "next/image";

import LoopGateLogo from "@/public/images/icon/icon.svg";

const Img = ({ className }: { className?: string }) => {
  return (
    <Image
      src={LoopGateLogo}
      alt="LoopGate Icon"
      height={40}
      className={className}
    />
  );
};

const ShinyLogo = () => (
  <div className="flex justify-center items-center select-none flex-shrink-0">
    <Img />
    <Img className="absolute blur-lg animate-pulse" />
  </div>
);

export default ShinyLogo;
