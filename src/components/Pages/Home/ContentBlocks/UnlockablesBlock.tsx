import {
  ArrowLongRightIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import { UnlockableV2 } from "@/src/config/types";

import UnlockablesItem from "./UnlockablesItem";

type Props = {
  unlockables: UnlockableV2[] | [];
};

const BrowseAllLink = () => (
  <Link
    href="/unlocks/browse"
    className="text-sky-500 hover:text-white hover:bg-sky-500/10 space-x-2 duration-150 flex items-center p-5 lg:p-8 w-full flex-grow border-t border-white/10"
  >
    <span>
      Browse all{" "}
      <span className="hidden lg:inline-block">unlockable content</span>
    </span>
    <ArrowLongRightIcon className="w-5 h-5" />
  </Link>
);

const EmptyState = () => (
  <div className="p-5 lg:p-8 pt-0 lg:pt-0 flex-grow flex w-full">
    <div className="rounded-md border border-dashed border-white/10 flex-grow flex flex-col items-center justify-center text-center text-white/60 text-sm p-5">
      <FolderOpenIcon className="w-8 h-8 flex-shrink-0 text-white/20" />
      <p className="mt-3">This LoopGate instance has no Unlockables (yet).</p>
      <a
        href="https://0xgeel.gitbook.io/loopgate-documentation/"
        target="_blank"
        rel="noreferrer"
        className="px-3 py-2 bg-white/5 rounded-md border border-white/10 mt-6 hover:bg-white/10 duration-150 hover:text-white shadow-md"
      >
        Learn how to get started
      </a>
    </div>
  </div>
);

const UnlockablesBlock = ({ unlockables }: Props) => {
  return (
    <div className="rounded-lg col-span-12 lg:col-span-5 self-stretch flex flex-col items-start bg-white/5">
      <div className="flex items-center space-x-2 font-display p-5 lg:p-10">
        <h2 className="font-semibold">Browse Unlockables</h2>
        <span className="font-light text-xs text-white/70">
          [ {unlockables.length} ]
        </span>
      </div>
      {unlockables.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {unlockables.slice(0, 3).map(item => (
            <UnlockablesItem key={item.id} unlockable={item} />
          ))}
          <BrowseAllLink />
        </>
      )}
    </div>
  );
};

export default UnlockablesBlock;
