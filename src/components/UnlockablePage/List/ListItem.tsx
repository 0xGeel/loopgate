import Link from "next/link";
import Jazzicon from "react-jazzicon";

import { UnlockableV2 } from "@/src/config/types";
import { uuidToNumber } from "@/src/utils/generic";

type Props = {
  unlockable: UnlockableV2;
};

const ListItem = ({ unlockable }: Props) => {
  const fallback = {
    title: "Unnamed unlockable",
    description: "No description",
  };

  return (
    <Link href={`/unlocks/${unlockable.id}`} className="group block">
      <div className="flex space-x-4 items-center py-3 w-full">
        <Jazzicon
          diameter={40}
          paperStyles={{ flexShrink: 0 }}
          seed={uuidToNumber(unlockable.id)}
        />
        <div className="divide-y-1 truncate">
          <h2 className="font-medium truncate group-hover:text-sky-500 group-active:text-sky-900 duration-150 ">
            {unlockable.metadata?.name
              ? unlockable.metadata?.name
              : fallback.title}
          </h2>
          <p className="text-sm text-white/60 group-hover:text-sky-500/80 group-active:text-sky-900 duration-150 truncate">
            {unlockable.metadata?.description
              ? unlockable.metadata?.description
              : fallback.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListItem;
