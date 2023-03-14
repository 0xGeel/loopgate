import ShinyLogo from "./ShinyLogo";
import { ConnectKitButton, useSIWE } from "connectkit";
import { useAccount } from "wagmi";
import { SignInHint } from "@/src/components/ConnectPrompt/ConnectPrompt";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { UnlockableV2 } from "@/src/config/types";

type Props = {
  unlockable: UnlockableV2;
};

const UnlockCard = ({ unlockable }: Props) => {
  const { signedIn } = useSIWE();
  const { address } = useAccount();

  console.log(unlockable);

  return (
    <div className="max-w-xl w-full rounded-md bg-slate-800/50 mx-8 relative">
      <ShinyLogo />
      <div className="p-8 space-y-4">
        <h1 className="font-display text-xl text-center">
          {unlockable.metadata.name
            ? unlockable.metadata.name
            : "Unnamed unlockable"}
        </h1>
        <p className="text-white/70 text-center">
          {unlockable.metadata.description
            ? unlockable.metadata.description
            : "No description available..."}
        </p>
      </div>
      {!signedIn ? (
        <div className="flex flex-col-reverse md:flex-row items-center md:space-x-6 p-8 border-t-4 border-slate-900">
          <div className="relative">
            <ConnectKitButton />
            {address && <SignInHint />}
          </div>
          <p className="text-sm text-white/70 max-w-sm text-center md:text-left mb-4 md:mb-0">
            Unlock this content by connecting with your wallet to verify you
            have the required NFT(s).
          </p>
        </div>
      ) : (
        <a
          href="#!"
          className="flex justify-center items-center bg-sky-400 hover:bg-sky-300 duration-150 text-slate-900 px-8 py-4 border-slate-900 border-t-4 rounded-b-md group"
        >
          <div className="flex justify-center items-center space-x-2 transform group-hover:translate-x-4 duration-150">
            <h2 className="font-display font-medium text-sm">
              Access the content
            </h2>
            <ArrowLongRightIcon className="w-6 h-6" />
          </div>
        </a>
      )}
    </div>
  );
};

export default UnlockCard;
