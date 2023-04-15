import { Content, Direction } from "./types";
import Marquee from "react-fast-marquee";
import ContentItem from "./ContentItem";

type Props = {
  content: Content[];
  direction: Direction;
};

const MarqueeRow = ({ content, direction }: Props) => {
  return (
    <Marquee
      className="py-4 items-center"
      gradientColor={[29, 35, 53]}
      gradientWidth={75}
      direction={direction}
    >
      {content.map((item, i) => (
        <ContentItem key={i} title={item.title} iconName={item?.iconName} />
      ))}
    </Marquee>
  );
};

export default MarqueeRow;
