import FooterLink from "./FooterLink";
import { TwitterIcon, GithubIcon } from "../Icons/Icons";
import { getCurrentYear } from "../../utils/generic";

const Footer = () => {
  const currentYear = getCurrentYear();
  const twitterLink = "#!"; // TODO
  const sourceCodeLink = "#!"; // TODO

  return (
    <div className="py-4 px-8 w-full flex flex-col md:flex-row items-center justify-between space-y-1 md:space-y-0 mt-auto ">
      <p className="text-white/40">
        {currentYear},{" "}
        <FooterLink href="https://twitter.com/0xgeel">geel.eth</FooterLink> — 
        Made for the L2 community.
      </p>
      <div className="space-x-4">
        <FooterLink href={sourceCodeLink}>
          <p>Source Code</p>
          <GithubIcon className="w-5 h-5" />
        </FooterLink>
        <FooterLink href={twitterLink}>
          <p>Share on Twitter</p>
          <TwitterIcon className="w-5 h-5" />
        </FooterLink>
      </div>
    </div>
  );
};

export default Footer;
