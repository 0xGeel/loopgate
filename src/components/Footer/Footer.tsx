import FooterLink from "./FooterLink";
import { TwitterIcon, GithubIcon } from "../Icons/Icons";
import { getCurrentYear } from "../../utils/generic";

const Footer = () => {
  const currentYear = getCurrentYear();
  const twitterLink =
    "https://twitter.com/intent/tweet?text=Check%20out%20%23LoopGate%2C%20a%20%23Dapp%20that%20facilitates%20Token-Gated%20Content%20using%20%23Loopring%20%23L2%20%23NFTs%20%F0%9F%91%80%20%F0%9F%A4%AF&url=https%3A%2F%2Floopgate.netlify.app%2F&via=0xGeel";
  const sourceCodeLink = "https://github.com/0xGeel/loopring-token-gating";

  return (
    <div className="py-4 px-8 w-full flex flex-col md:flex-row items-center justify-between space-y-1 md:space-y-0 mt-auto text-center">
      <p className="text-white/40">
        {currentYear},{" "}
        <FooterLink href="https://twitter.com/0xgeel">geel.eth</FooterLink> — 
        Made for the L2 community.
      </p>
      <div className="space-x-4">
        <FooterLink href={sourceCodeLink}>
          <p className="hidden md:inline-block">Source Code</p>
          <GithubIcon className="w-5 h-5" />
        </FooterLink>
        <FooterLink href={twitterLink}>
          <p className="hidden md:inline-block"> Share on Twitter</p>
          <TwitterIcon className="w-5 h-5" />
        </FooterLink>
      </div>
    </div>
  );
};

export default Footer;
