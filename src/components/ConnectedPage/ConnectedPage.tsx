import { useEffect, useState } from "react";

import EmptyState from "./EmptyState";
import UnlockLink from "./UnlockLink";
import Spinner from "../Spinner";
import { useAccount } from "wagmi";
import axios from "axios";
import toast from "react-hot-toast";

const ConnectedPage = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [unlocks, setUnlocks] = useState<any[]>([]);

  const getUserUnlocks = (address: `0x${string}` | undefined) => {
    axios
      .get(`/api/getUserUnlocks?address=${address}`)
      .then((data) => {
        setUnlocks(data.data.unlocks);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.request.response);
        setIsLoading(false);
      });
  };

  // On render: make API calls to determine NFT holdings
  // 1.: GET user's Loopring ID            (Loopring API)
  // 2.: GET user's NFTs                   (Loopring API)
  // 3.: Check config to compare NFTs and unlocks
  // 4.: GET submarined content            (Pinata API)

  useEffect(() => {
    setIsLoading(true);
    getUserUnlocks(address);
  }, [address]);

  return (
    <div className="flex flex-col items-center flex-grow space-y-8">
      <div className="max-w-2xl w-full py-8 px-6">
        <h1 className="text-2xl font-medium font-display mb-4">
          Your unlocked content
        </h1>

        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Spinner />
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {unlocks.length >= 1 ? (
              <div className="flex flex-col mb-8">
                {unlocks.map((unlock) => (
                  <UnlockLink
                    key={`${unlock.item.id}${unlock.accessLink}`}
                    title={unlock.item.name}
                    unlockUrl={unlock.accessLink}
                    cid={unlock.item.cid}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectedPage;
