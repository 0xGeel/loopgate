import ShinyLogo from "./ShinyLogo";
import { ConnectKitButton, useSIWE } from "connectkit";
import { useAccount } from "wagmi";
import { SignInHint } from "@/src/components/ConnectPrompt/ConnectPrompt";
import {
  ArrowLongRightIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { UnlockableV2 } from "@/src/config/types";
import { formatDistance } from "date-fns";
import { truncate0x } from "@/src/utils/generic";

type Props = {
  unlockable: UnlockableV2;
};

const UnlockLink = ({ accessLink }: { accessLink: string }) => {
  return (
    <a
      href={accessLink}
      className="flex justify-center items-center bg-sky-400 hover:bg-sky-300 duration-150 text-slate-900 px-8 py-4 border-slate-900 border-t-4 rounded-b-md group"
    >
      <div className="flex justify-center items-center space-x-2 transform group-hover:translate-x-4 duration-150">
        <h2 className="font-display font-medium text-sm">
          Click here to gain access
        </h2>
        <ArrowLongRightIcon className="w-6 h-6" />
      </div>
    </a>
  );
};

// TODO: Extract to /utils/generic, add unit tests
const formatRelativeDate = (date: Date | string) => {
  const ts = new Date(date);
  return formatDistance(ts, new Date(), { addSuffix: true });
};

const UnlockCard = ({ unlockable }: Props) => {
  const { signedIn } = useSIWE();
  const { address } = useAccount();

  console.log(unlockable);

  return (
    <div className="max-w-xl w-full rounded-md bg-slate-800/50 mx-8 border border-white/10">
      <div className="md:flex items-start md:space-x-6 p-8">
        <ShinyLogo />
        <div className="mt-4 md:mt-0">
          <h1 className="font-display text-lg">
            {unlockable.metadata.name
              ? unlockable.metadata.name
              : "A mystery awaits..."}
          </h1>
          <p className={"text-white/60 text-sm mt-2"}>
            {unlockable.metadata.description
              ? unlockable.metadata.description
              : "The owner of this unlockable has not (yet) specified a description for this content. We are sure it kicks ass though."}
          </p>
          <div className="text-sm text-white/60 mt-4 pt-4 border-t border-white/10 space-x-4">
            <div className="inline-flex space-x-1.5 items-center">
              <ClockIcon className="h-4 w-4 text-white/20" />
              <p>{formatRelativeDate(unlockable.metadata.lastUpdated)}</p>
            </div>
            <a
              href={`https://explorer.loopring.io/search?q=${unlockable.owner}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex space-x-1.5 items-center hover:text-sky-500 group duration-150"
            >
              <UserGroupIcon className="h-4 w-4 text-white/20" />
              <p className="border-b border-sky-500/0 group-hover:border-sky-500 duration-150">
                {truncate0x(unlockable.owner)}
              </p>
            </a>
          </div>
        </div>
      </div>
      {!signedIn ? (
        <div className="flex flex-col md:flex-row items-center border-t border-white/10 p-8 bg-gradient-to-b from-sky-500/10 to-transparent rounded-b relative">
          <div className="w-full h-full border absolute top-0 left-0 rounded-b animate-pulse border-white/50 opacity-5 pointer-events-none" />
          <div className="relative md:mr-6">
            <ConnectKitButton />
            {address && <SignInHint />}
          </div>
          <p className="text-sm text-white/60 max-w-sm text-center md:text-left mt-4 mt:mb-0">
            Unlock this content by connecting with your wallet to verify you
            have the required NFT(s).
          </p>
        </div>
      ) : (
        <UnlockLink accessLink="#!" />
      )}
    </div>
  );
};

export default UnlockCard;
