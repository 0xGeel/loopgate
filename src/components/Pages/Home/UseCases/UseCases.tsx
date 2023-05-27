import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { animated } from "react-spring";

import useBoop from "@/src/hooks/useBoop";

import MarqueeRow from "./MarqueeRow";
import { Direction, IconNames, UseCase } from "./types";

const data: UseCase[] = [
  {
    audience: "Musicians",
    description:
      "Establish a stronger connection to your fans exclusive content, priority tickets to live events and more...",
    content: [
      {
        title: "HQ Downloads",
        iconName: IconNames.MUSIC,
      },
      {
        title: "Sheet Music",
        iconName: IconNames.DOCUMENT,
      },
      {
        title: "Access to Meet & Greets",
        iconName: IconNames.TICKET,
      },
      {
        title: "Concert Recordings",
        iconName: IconNames.MICROPHONE,
      },
      {
        title: "Early Access to Ticket Sales",
        iconName: IconNames.TICKET,
      },
      {
        title: "Behind The Scenes Recordings",
        iconName: IconNames.FILM,
      },
    ],
  },
  {
    audience: "3D Artists",
    description:
      "A secure place to let your customers truly own their assets alongside other benefits...",
    content: [
      {
        title: "Downloadable, Metaverse-Ready Game Assets",
        iconName: IconNames.FOLDER,
      },
      {
        title: "Concept Art",
        iconName: IconNames.VIDEO_CAMERA,
      },
      {
        title: "Shopping Discount Codes",
        iconName: IconNames.SHOPPING_CART,
      },
    ],
  },
  {
    audience: "any L2 Creator",
    description:
      "Add utility to your NFTs by giving your customers cheeky benefits and true ownership of assets...",
    content: [
      {
        title: "Exclusive Digital Collectibles",
        iconName: IconNames.GIFT,
      },
      {
        title: "Articles and Blog Posts",
        iconName: IconNames.DOCUMENT,
      },
      {
        title: "Early Access to Content",
        iconName: IconNames.NEWSPAPER,
      },
      {
        title: "Alpha Game Builds",
        iconName: IconNames.FILM,
      },
      {
        title: "Loopring Red Packets",
        iconName: IconNames.QR,
      },
      {
        title: "Shopping Discount Codes",
        iconName: IconNames.SHOPPING_CART,
      },
    ],
  },
];

const UseCases = () => {
  const [selectedUseCase, setSelectedUseCase] = useState(0);
  const [boopStyle, boopTrigger] = useBoop({ scale: 1.05 });

  const onNextItem = () => {
    if (selectedUseCase + 1 >= data.length) {
      setSelectedUseCase(0);
    } else {
      setSelectedUseCase(selectedUseCase + 1);
    }
    boopTrigger();
  };

  return (
    <div
      className="max-w-4xl mx-auto p-5 lg:p-8 mt-40 mb-20 flex flex-col items-center w-full scroll-m-8"
      id="use-cases"
    >
      <div className="flex items-center space-x-2 justify-between w-full px-2">
        <h2 className="font-display text-2xl">Use Cases</h2>
        <button
          className="text-sky-500 flex items-center space-x-2 hover:text-white duration-150 active:text-sky-800"
          onClick={onNextItem}
        >
          <span>Next</span>
          <ArrowLongRightIcon className="w-5 h-5" />
        </button>
      </div>
      <animated.div
        className="rounded-lg bg-white/5 border border-white/10 mt-6 w-full shadow-2xl shadow-sky-500/10 overflow-hidden"
        style={boopStyle}
      >
        <div className="p-5 lg:p-12 lg:pb-5 max-w-lg space-y-4">
          <h3 className="font-display text-lg font-medium">
            For{" "}
            <span className="text-sky-500">
              {data[selectedUseCase].audience}
            </span>
          </h3>
          <p className="text-white/70 leading-relaxed font-light">
            {data[selectedUseCase].description}
          </p>
        </div>
        <div className="-space-y-4 pointer-events-none pb-4">
          <MarqueeRow
            content={data[selectedUseCase].content}
            direction={Direction.LEFT}
          />
          <MarqueeRow
            content={data[selectedUseCase].content}
            direction={Direction.RIGHT}
          />
        </div>
      </animated.div>
    </div>
  );
};

export default UseCases;
