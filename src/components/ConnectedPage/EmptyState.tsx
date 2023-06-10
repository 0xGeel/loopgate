import { useDisconnect } from "wagmi";
import Button from "../Button";
import { EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSIWE } from "connectkit";

const EmptyState = () => {
  const { disconnect } = useDisconnect();
  const { signOut } = useSIWE();

  const onDisconnect = () => {
    disconnect(); // Disconnect from the connector
    signOut(); // Destroy any SIWE sessions
  };

  return (
    <div className="px-6 py-8 border-2 border-dashed border-white/20 rounded-md flex flex-col items-center justify-center space-y-8 backdrop-blur-xl bg-slate-900/10 shadow-xl shadow-slate-900/50">
      <EyeSlashIcon className="w-16 h-16 text-sky-500/40" />
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-medium font-display mb-4">
          There&apos;s nothing here!
        </h1>
        <p className="text-white/70 text-center max-w-sm">
          Bummer.. your wallet does not hold any NFTs that provide access to
          token-gated content.
        </p>
      </div>
      <Button onClick={onDisconnect}>
        <p>Disconnect Wallet</p>
        <XMarkIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default EmptyState;
