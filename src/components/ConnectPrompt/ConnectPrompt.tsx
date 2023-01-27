import { ConnectKitButton } from "connectkit";

const ConnectPrompt = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-10">
      <div className="space-y-2 flex flex-col items-center">
        <h1 className="text-4xl font-medium">Connect with your L2 Wallet</h1>
        <p className="text-white/70">
          To see if you are worthy of unlocking content...
        </p>
      </div>
      <ConnectKitButton />
    </div>
  );
};

export default ConnectPrompt;
