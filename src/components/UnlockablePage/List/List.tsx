import ListItem from "./ListItem";
import { UnlockableV2 } from "@/src/config/types";

type Props = {
  unlockables: UnlockableV2[];
};

const List = ({ unlockables }: Props) => {
  return (
    <div className="flex flex-col max-w-3xl w-full">
      <h1 className="font-display border-b border-white/20 pb-2">
        Browse Unlockables
        <span className="text-xs text-white/60 w-full text-right ml-2">
          [ {unlockables.length} ]
        </span>
      </h1>
      <div className="divide-y divide-white/20">
        {unlockables.map((item) => (
          <ListItem key={item.id} unlockable={item} />
        ))}
      </div>
    </div>
  );
};

export default List;
