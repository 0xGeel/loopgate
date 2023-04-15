import { findAllUnlockables, fetchAllUnlockables } from "@/src/utils/generic";
import Layout from "@/src/components/UnlockablePage/Layout";
import FourOhFour from "@/src/components/UnlockablePage/404";
import { GetServerSideProps } from "next";
import { UnlockableV2 } from "@/src/config/types";
import List from "@/src/components/UnlockablePage/List";

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  if (unlockables.length === 0) {
    return (
      <FourOhFour
        label={"This LoopGate Instance does not have any Unlockables yet."}
      />
    );
  }

  return (
    <Layout containerClass="flex-grow flex justify-center mt-4 md:mt-10 p-4 md:p-6">
      <List unlockables={unlockables} />
    </Layout>
  );
};

export default Page;
