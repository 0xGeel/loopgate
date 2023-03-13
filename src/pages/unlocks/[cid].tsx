import { useRouter } from "next/router";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Image from "next/image";
import { ConnectKitButton, useSIWE } from "connectkit";
import { SignInHint } from "@/src/components/ConnectPrompt/ConnectPrompt";
import { useAccount } from "wagmi";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";

import LoopGateLogo from "@/public/images/icon/icon.svg";

const ShinyLogo = () => (
  <div className="w-full flex justify-center -mt-8 select-none">
    <Image src={LoopGateLogo} alt="LoopGate Icon" height={60} />
    <Image
      className="absolute blur-lg animate-pulse"
      src={LoopGateLogo}
      alt="LoopGate Icon"
      height={60}
    />
  </div>
);

const Page = () => {
  const router = useRouter();
  const { cid } = router.query;
  const { signedIn } = useSIWE();
  const { address } = useAccount();

  // 1.: Check if CID exists in config.ts (if not: —> 404)
  // 2.: Show unlock title and description (if available)
  // 3.: NFT ID => NFT Datas
  // 4.: [@TODO] Query NFT holders by looprings nftData
  // 5.: 0x address => Account ID
  // 6.: Check if user owns the NFT
  // 7.: If so: generate Pinata Unlock Link & display

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />

      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-xl w-full rounded-md bg-slate-800/50 mx-8 relative">
          <ShinyLogo />
          <div className="p-8 space-y-4">
            <h1 className="font-display text-xl text-center">
              Title of the unlock
            </h1>
            <p className="text-white/70 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              assumenda facilis exercitationem excepturi.
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
      </div>

      <Footer />
    </div>
  );
};

export default Page;
