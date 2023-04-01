import { UnlockableV2 } from "@/src/config/types";
import { ColourModes } from "./Block";
import {
  SparklesIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  CodeBracketIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import Block from "./Block";
import WaitlistBtn from "./BrowseAllBtn";
import Marquee from "./Marquee";
import Links from "./Links";
import UnlockablesBlock from "./UnlockablesBlock";

type Props = {
  unlockables: UnlockableV2[] | [];
};

const ContentBlocks = ({ unlockables }: Props) => {
  const iconStyle = "w-8 h-8 flex-shrink-0";
  const linkIconStyle = "opacity-80 w-4 h-4";

  return (
    <div
      id="ContentBlocks"
      className="max-w-7xl w-full relative grid grid-cols-12 gap-5 items-center mx-auto mt-32 px-4 md:px-8"
    >
      <Block
        title="Token-Gate any content"
        description={[
          "Trustlessly control access to your 3D in-game assets, high-quality music, behind-the-scenes footage, articles, or games.",
          "The only limit is your imagination.",
        ]}
        icon={<SparklesIcon className={iconStyle} />}
        colourMode={ColourModes.ACCENT}
        className="lg:col-span-7"
      >
        <WaitlistBtn />
      </Block>
      <UnlockablesBlock unlockables={unlockables} />

      <Block
        title="Safe and sound"
        description={[
          "Built on a core of Loopring L2 NFTs, Pinata's Submarine SDK and the EIP-4361 standard (Sign-In With Ethereum), LoopGate takes security seriously. ",
        ]}
        icon={<ShieldCheckIcon className={iconStyle} />}
        colourMode={ColourModes.BASE}
        className="lg:col-span-5"
      >
        <Marquee
          className="mt-6 md:mt-10 py-2 items-center"
          logos={[
            {
              src: "logos/loopring.png",
              alt: "Loopring Logo",
              href: "https://loopring.io",
            },
            {
              src: "logos/siwe.png",
              alt: "SIWE Logo",
              href: "https://docs.login.xyz/general-information/siwe-overview",
            },
            {
              src: "logos/pinata.png",
              alt: "Pinata Logo",
              href: "https://docs.pinata.cloud/submarine-api",
            },
            {
              src: "logos/gme-wallet.png",
              alt: "GameStop Wallet Logo",
              href: "https://wallet.gamestop.com",
            },
            {
              src: "logos/walletconnect.png",
              alt: "WalletConnect Logo",
              href: "https://walletconnect.com",
            },
            {
              src: "logos/metamask.png",
              alt: "Metamask Logo",
              href: "https://metamask.io",
            },
            {
              src: "logos/next.png",
              alt: "NextJS Logo",
              href: "https://nextjs.org/",
            },
            {
              src: "logos/supabase.png",
              alt: "Supabase Logo",
              href: "https://supabase.com/",
            },
            {
              src: "logos/netlify.png",
              alt: "Netlify Logo",
              href: "https://netlify.com/",
            },
          ]}
        />
      </Block>
      <Block
        title="Be Your Own LoopGate"
        description={[
          "LoopGate is an open source project created for the L2 community — anyone can host their own instance. Power to the Creators!",
        ]}
        icon={<RocketLaunchIcon className={iconStyle} />}
        colourMode={ColourModes.BASE}
        className="lg:col-span-7"
      >
        <Links
          title="Get started"
          links={[
            {
              icon: <DocumentTextIcon className={linkIconStyle} />,
              label: "Read the documentation",
              url: "https://0xgeel.gitbook.io/loopgate-documentation/",
            },
            {
              icon: <CodeBracketIcon className={linkIconStyle} />,
              label: "Check out the Source Code",
              url: "https://github.com/0xGeel/loopgate",
            },
            {
              icon: <DocumentTextIcon className={linkIconStyle} />,
              label: "Read the License",
              url: "https://github.com/0xGeel/loopgate/blob/main/LICENSE",
            },
          ]}
        />
      </Block>
    </div>
  );
};

export default ContentBlocks;
