import { GetServerSideProps } from "next";
import {
  fetchAllUnlockables,
  findAllUnlockables,
} from "../services/loopgate/unlockable";
import { UnlockableV2 } from "../config/types";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Pages/Home/Hero";
import ContentBlocks from "../components/Pages/Home/ContentBlocks";
import UseCases from "../components/Pages/Home/UseCases";
import CTABanner from "../components/Pages/Home/CTABanner";
import { techPattern } from "../styles/inlineStyles";

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3000, stale-while-revalidate=5000"
  );

  const unlockables =
    process.env.LOOPGATE_MODE === "supabase"
      ? await fetchAllUnlockables() // Use Supabase as the source for the Unlockables
      : findAllUnlockables(); // Use the 'config.ts' file as the source for the Unlockables

  if (!unlockables) {
    return {
      props: { unlockables: [] },
    };
  }

  return {
    props: { unlockables: unlockables },
  };
};

const Page = ({ unlockables }: { unlockables: UnlockableV2[] | [] }) => {
  return (
    <div
      className="min-h-screen h-full flex flex-col bg-center"
      style={techPattern}
    >
      <Header />
      <Hero
        title="Token-Gate Content on Loopring L2"
        subtitle="Reward your community with exclusive content available only to few. LoopGate adds utility to NFTs by empowering creators to unlock special content for token holders."
        ctaText="Learn more"
      />
      <ContentBlocks unlockables={unlockables} />
      <UseCases />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Page;
