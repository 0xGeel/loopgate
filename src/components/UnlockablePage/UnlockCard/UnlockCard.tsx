import ShinyLogo from "./ShinyLogo";
import { ConnectKitButton, useSIWE } from "connectkit";
import { useAccount } from "wagmi";
import { SignInHint } from "@/src/components/ConnectPrompt/ConnectPrompt";
import { UnlockableV2 } from "@/src/config/types";
import Metadata from "./Metadata";
import Title from "./Title";
import Description from "./Description";
import UnlockSection from "./UnlockSection";

type Props = {
  unlockable: UnlockableV2;
};

const UnlockCard = ({ unlockable }: Props) => {
  const { signedIn } = useSIWE();
  const { address } = useAccount();

  return (
    <div className="max-w-xl w-full rounded-md bg-slate-800/50 mx-4 md:mx-8 border border-white/10 shadow-2xl shadow-sky-500/10">
      <div className="md:flex items-start md:space-x-6 p-8">
        <ShinyLogo />
        <div className="mt-4 md:mt-0">
          <Title text={unlockable.metadata.name} />
          <Description text={unlockable.metadata.description} />
          <Metadata
            lastUpdated={unlockable.metadata.lastUpdated}
            owner={unlockable.owner}
            unlockCriteria={unlockable.unlockCriteria}
          />
        </div>
      </div>
      {!signedIn ? (
        <div className="flex flex-col md:flex-row items-center border-t border-white/10 p-8 bg-gradient-to-b from-sky-500/10 to-transparent rounded-b relative">
          <div className="w-full h-full border absolute top-0 left-0 rounded-b animate-pulse border-white/50 opacity-5 pointer-events-none" />
          <div className="relative md:mr-6">
            <ConnectKitButton />
            {address && <SignInHint />}
          </div>
          <p className="text-sm text-white/60 max-w-sm text-center md:text-left mt-4 md:mt-0">
            Unlock this content by connecting with your wallet to verify you
            have the required NFT(s).
          </p>
        </div>
      ) : (
        <UnlockSection unlockable={unlockable} />
      )}
    </div>
  );
};

export default UnlockCard;
