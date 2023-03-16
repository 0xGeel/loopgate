import { formatRelativeDate, truncate0x } from "@/src/utils/generic";
import { ClockIcon, UserGroupIcon } from "@heroicons/react/20/solid";

type Props = {
  lastUpdated: string | Date;
  owner: `0x${string}`;
};

const Metadata = ({ lastUpdated, owner }: Props) => (
  <div className="text-sm text-white/60 mt-4 pt-4 border-t border-white/10 space-x-4">
    <div className="inline-flex space-x-1.5 items-center">
      <ClockIcon className="h-4 w-4 text-white/20" />
      <p>{formatRelativeDate(lastUpdated)}</p>
    </div>
    <a
      href={`https://explorer.loopring.io/search?q=${owner}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex space-x-1.5 items-center hover:text-sky-500 group duration-150"
    >
      <UserGroupIcon className="h-4 w-4 text-white/20" />
      <p className="border-b border-sky-500/0 group-hover:border-sky-500 duration-150">
        {truncate0x(owner)}
      </p>
    </a>
  </div>
);

export default Metadata;
