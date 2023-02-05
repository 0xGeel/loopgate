import {
  LockClosedIcon,
  LockOpenIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

interface Props {
  title: string;
  unlockUrl: string;
  cid: `baf${string}`;
}

const UnlockLink = ({ title, unlockUrl, cid }: Props) => {
  return (
    <a
      className="flex space-x-4 items-center w-full border-t border-white/20 py-4 hover:bg-white/10 duration-150 px-2 group text-white/80 hover:text-white-100"
      href={unlockUrl}
      target="_blank"
      rel="noreferrer"
    >
      <div className="bg-sky-500/70 group-hover:bg-sky-500 rounded-md h-8 w-8 flex-shrink-0 text-slate-900 duration-150 relative overflow-hidden">
        <LockClosedIcon className="absolute h-full w-full left-0 top-0 p-1.5 duration-150 ease-in-out group-hover:translate-y-full" />
        <LockOpenIcon className="absolute h-full w-full left-0 top-0 p-1.5 duration-150 ease-in-out -translate-y-full group-hover:translate-y-0" />
      </div>
      <div className="flex-col w-full text-left">
        <h2 className=" group-hover:text-sky-500 duration-150 font-display">
          {title ? title : "Untitled"}
        </h2>
        <p className="truncate w-40 text-sm text-cyan-100/40">{cid}</p>
      </div>
      <ChevronRightIcon className="w-5 h-5 flex-shrink-0 text-white/50 group-hover:text-white duration-150" />
    </a>
  );
};

export default UnlockLink;
