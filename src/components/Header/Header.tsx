import { ConnectKitButton } from "connectkit";

const Header = () => {
  return (
    <div className="w-full flex py-3 px-4 sm:px-6 sticky top-0 items-center justify-between border-b sm:border-b-0 border-white/10 bg-slate-900/50 backdrop-blur-lg z-10">
      <p className="font-medium text-2xl cursor-default">
        Loop<span className="text-sky-500">Gate</span>
        <span className="text-xs ml-2 text-white/50">V.0.1.0</span>
      </p>
      <ConnectKitButton />
    </div>
  );
};

export default Header;
