import { ArrowLongRightIcon } from "@heroicons/react/20/solid";

type Props = {
  accessLink: string;
};

const UnlockLink = ({ accessLink }: Props) => {
  return (
    <a
      href={accessLink}
      target="_blank"
      rel="noreferrer"
      className="flex justify-center items-center bg-sky-400 hover:bg-sky-300 duration-150 text-slate-900 px-8 py-4 border-slate-900 border-t-4 rounded-b-md group"
    >
      <div className="flex justify-center items-center space-x-2 transform group-hover:translate-x-4 group-active:scale-90 duration-150">
        <h2 className="font-display font-medium text-sm">
          Click here to gain access
        </h2>
        <ArrowLongRightIcon className="w-6 h-6" />
      </div>
    </a>
  );
};

export default UnlockLink;
