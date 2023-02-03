import { useEffect, useState } from "react";
import axios from "axios";
import { fancyLog } from "../utils/generic/fancyLog";
import { useAccount } from "wagmi";

// Helper fn to get the active session status
const getSessionStatus = async () => {
  const session = await axios.get("/api/session/current");
  return session.data;
};

// Helper fn to create a new session
const createNewSession = async (address: `0x${string}`) => {
  const session = await axios.post("/api/session/create", {
    address: address,
  });
  return session.data;
};

// Check if the user has an active wallet connection.
// If so, check if the user has an active iron-session.
// If not, request a new iron-session from the backend.
const useActiveSession = () => {
  const { address, isConnected } = useAccount();
  const [isActive, setIsActive] = useState(false);

  fancyLog("Checking for an active session...");

  useEffect(() => {
    if (isConnected && address) {
      getSessionStatus()
        .then((data) => {
          if (
            !data.isSessionActive ||
            (data.isSessionActive && data.id !== address)
          ) {
            // No active session || active session, but back- and frontend don't match ==> Create new session
            fancyLog(
              "No active session found, or session mismatch. Requesting a new session."
            );

            createNewSession(address);
          }

          if (data.isSessionActive && data.id === address) {
            fancyLog("Session was already active 😀");
          }

          setIsActive(true);
          fancyLog("Session is setup again! 🎉");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [address, isConnected]);

  return { isStateActive: isActive };
};

export default useActiveSession;
