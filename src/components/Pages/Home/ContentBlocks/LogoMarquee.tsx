import RFMarquee from "react-fast-marquee";
import Image from "next/image";

interface Logo {
  src: string;
  alt: string;
  href: string;
}

interface Props {
  logos: Logo[];
  className?: string;
}

const LogoMarquee = ({ logos, className }: Props) => {
  return (
    <RFMarquee
      className={className}
      gradientColor={[29, 35, 53]}
      gradientWidth={75}
    >
      {logos.map((item, i) => (
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          key={i}
          className="mx-6"
        >
          <Image
            width={80}
            height={80}
            quality={100}
            src={`/images/marquee/${item.src}`}
            alt={item.alt}
            className="h-auto w-16 p-2 bg-white/5 rounded-md border border-white/10 shadow-lg hover:bg-white/10 hover:scale-110 duration-200"
          />
        </a>
      ))}
    </RFMarquee>
  );
};

export default LogoMarquee;
