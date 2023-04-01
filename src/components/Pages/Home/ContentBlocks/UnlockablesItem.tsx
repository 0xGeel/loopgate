import Link from "next/link";
import { UnlockableV2 } from "@/src/config/types";
import Jazzicon from "react-jazzicon";
import { uuidToNumber } from "@/src/utils/generic";

type Props = {
  unlockable: UnlockableV2;
};

const UnlockablesItem = ({ unlockable }: Props) => {
  const fallback = {
    title: "An unnamed unlockable...",
    description: "No description",
  };

  return (
    <Link
      href={`/unlocks/${unlockable.id}`}
      className="group flex space-x-3 items-center py-3 px-5 md:px-8 w-full border-t border-white/10 hover:bg-sky-500/10 duration-150"
    >
      <Jazzicon
        diameter={28}
        paperStyles={{ flexShrink: 0 }}
        seed={uuidToNumber(unlockable.id)}
      />
      <div className="divide-y-1 truncate">
        <h2 className="font-medium text-sm truncate">
          {unlockable.metadata?.name
            ? unlockable.metadata?.name
            : fallback.title}
        </h2>
        <p className="text-xs text-white/60 truncate">
          {unlockable.metadata?.description
            ? unlockable.metadata?.description
            : fallback.description}
        </p>
      </div>
    </Link>
  );
};

export default UnlockablesItem;
