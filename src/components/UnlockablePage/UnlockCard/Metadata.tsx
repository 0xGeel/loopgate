import {
  ClockIcon,
  // LockClosedIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

import { UnlockCriteria } from "@/src/config/types";
import { formatRelativeDate, truncate0x } from "@/src/utils/generic";

import Tooltip from "../../UI/Tooltip";

type Props = {
  lastUpdated: string | Date;
  owner: string;
  unlockCriteria: UnlockCriteria;
};

const Metadata = ({ lastUpdated, owner, unlockCriteria }: Props) => (
  <div className="text-sm text-white/60 mt-4 pt-4 border-t border-white/10 space-x-4">
    <div className="inline-flex space-x-1.5 items-center">
      <ClockIcon className="h-4 w-4 text-white/20" />
      <p>{formatRelativeDate(lastUpdated)}</p>
    </div>
    <Tooltip content={"Show all Unlockables by this user"}>
      <Link
        href={`/unlocks/browse?owner=${owner}`}
        className="inline-flex space-x-1.5 items-center hover:text-sky-500 group duration-150"
      >
        <UserGroupIcon className="h-4 w-4 text-white/20" />
        <p className="border-b border-sky-500/0 group-hover:border-sky-500 duration-150">
          {truncate0x(owner)}
        </p>
      </Link>
    </Tooltip>

    {unlockCriteria ? <></> : <></>}
    {/* <button
      className="inline-flex space-x-1.5 items-center hover:text-sky-500 duration-150"
      onClick={() => console.log("Clicked")}
    >
      <LockClosedIcon className="h-4 w-4 text-white/20" />
      <p className="border-b border-sky-500/0 group-hover:border-sky-500 duration-150">
        {unlockCriteria.unlockAmount} requirement
        {unlockCriteria.unlockAmount !== 1 && "s"}
      </p>
    </button> */}
  </div>
);

export default Metadata;
