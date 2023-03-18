import { ArrowLongRightIcon } from "@heroicons/react/20/solid";

type Props = {
  accessLink: string;
};

const PulseAnimation = () => {
  const circleBaseClass = "bg-sky-500 rounded-full absolute";
  const animationBaseClass =
    "will-change-transform will-change-opacity fill-mode-forwards";

  return (
    <div className="w-full h-full absolute top-0 left-0 -z-10 pointer-events-none overflow-hidden flex items-center justify-center">
      <div
        className={`flex items-center justify-center animate-unlock-success ${animationBaseClass}`}
      >
        <div
          className={`w-20 h-20 animate-unlock-success-1 ${animationBaseClass} ${circleBaseClass}`}
        />
        <div
          className={`w-40 h-40 animate-unlock-success-2 ${animationBaseClass} ${circleBaseClass}`}
        />
        <div
          className={`w-64 h-64 animate-unlock-success-3 ${animationBaseClass} ${circleBaseClass}`}
        />
      </div>
    </div>
  );
};

const UnlockLink = ({ accessLink }: Props) => {
  return (
    <>
      <PulseAnimation />
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
    </>
  );
};

export default UnlockLink;
