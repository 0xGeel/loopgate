import { NoSymbolIcon } from "@heroicons/react/20/solid";

const NoAccess = () => {
  return (
    <div className="flex items-center space-x-2 bg-gradient-to-b from-slate-400 to-slate-400/80 rounded-b text-slate-900 py-5 px-8">
      <div className="flex items-center justify-center sm:space-x-4">
        <NoSymbolIcon className="hidden sm:block w-8 h-8 flex-shrink-0 opacity-50" />
        <div className="space-y-1">
          <h1 className="font-display font-medium text-sm">
            No access granted
          </h1>
          <p className="text-sm">
            Your connected wallet does not meet the unlock requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoAccess;
