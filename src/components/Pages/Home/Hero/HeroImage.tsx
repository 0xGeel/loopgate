import Image from "next/image";

const Img = ({ size, className }: { size: number; className: string }) => (
  <Image
    src="/images/loopgate-glossy.png"
    alt="A glossy rendering of LoopGate's Logo"
    className={className}
    width={size}
    height={size}
    priority
    unoptimized
  />
);

const HeroImage = () => {
  const imgSize = {
    mobile: 240,
    desktop: 420,
  };

  return (
    <>
      <Img size={imgSize.mobile} className="md:hidden" />
      <Img size={imgSize.desktop} className="hidden md:block animate-float" />
    </>
  );
};

export default HeroImage;
