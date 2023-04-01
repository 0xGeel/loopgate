import HeroGlow from "./HeroGlow";
import HeroImage from "./HeroImage";
import { ArrowLongDownIcon } from "@heroicons/react/24/outline";

type Props = {
  title: string;
  subtitle: string;
  ctaText: string;
};

const Hero = ({ title, subtitle, ctaText }: Props) => {
  return (
    <div className="max-w-6xl w-full relative flex flex-col items-center mx-auto text-center">
      <HeroGlow className="text-sky-500/30 blur-3xl -z-10 w-full animate-pulse" />
      <HeroImage />
      <div className="max-w-2xl mx-auto space-y-6 px-4">
        <h1 className="font-display font-medium text-xl md:text-5xl md:leading-tight max-w-2xl">
          {title}
        </h1>
        <h2 className="text-white/70 leading-relaxed max-w-lg mx-auto font-light">
          {subtitle}
        </h2>
        <a
          href="#ContentBlocks"
          className="inline-flex flex-col items-center text-sky-400 hover:text-sky-200 duration-150 space-y-4"
        >
          <p>{ctaText}</p>
          <ArrowLongDownIcon className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
