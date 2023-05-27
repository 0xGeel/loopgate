import { UnlockableV2 } from "@/src/config/types";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../Spinner";
import UnlockLink from "./UnlockLink";
import NoAccess from "./NoAccess";
import toast from "react-hot-toast";
import logger from "@/src/utils/logger";

type Props = {
  unlockable: UnlockableV2;
};

const UnlockSection = ({ unlockable }: Props) => {
  const { address } = useAccount();

  const [isLoading, setIsLoading] = useState(false);
  // TODO: Type the 'PinataIndexLink' so that this 'any' can be removed.
  // eslint-disable-next-line
  const [unlockedContent, setUnlockedContent] = useState<any>(null);

  const checkUnlock = (
    address: `0x${string}` | undefined,
    unlockable: UnlockableV2
  ) => {
    axios
      .get(
        `/api/unlockable/verify-access?address=${address}&unlockableId=${unlockable.id}`
      )
      .then((data) => {
        setUnlockedContent(data.data.unlock);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        logger.error(error.response.data.message);
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    checkUnlock(address, unlockable);
  }, [address, unlockable]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center font-display text-sm space-x-2 border-t border-white/10 px-8 py-5 bg-gradient-to-b from-sky-500/10 to-transparent rounded-b">
          <Spinner />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {unlockedContent ? (
            <UnlockLink accessLink={unlockedContent.accessLink} />
          ) : (
            <NoAccess />
          )}
        </>
      )}
    </>
  );
};

export default UnlockSection;
