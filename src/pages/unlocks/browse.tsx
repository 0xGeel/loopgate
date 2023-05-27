import { truncate0x } from "@/src/utils/generic";
import {
  findAllUnlockables,
  fetchAllUnlockables,
} from "@/src/services/loopgate/unlockable";
import Layout from "@/src/components/UnlockablePage/Layout";
import FourOhFour from "@/src/components/UnlockablePage/404";
import { GetServerSideProps } from "next";
import { UnlockableV2 } from "@/src/config/types";
import List from "@/src/components/UnlockablePage/List";

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3000, stale-while-revalidate=5000"
  );

  const getOwner = () => {
    if (!context.query.owner) {
      return;
    }

    return Array.isArray(context.query.owner)
      ? context.query.owner[0]
      : context.query.owner;
  };

  const owner = getOwner();

  const unlockables =
    process.env.LOOPGATE_MODE === "supabase"
      ? await fetchAllUnlockables(owner) // Use Supabase as the source for the Unlockables
      : findAllUnlockables(owner); // Use the 'config.ts' file as the source for the Unlockables

  if (!unlockables) {
    return {
      props: { unlockables: [] },
    };
  }

  return {
    props: { unlockables: unlockables, query: owner ? owner : "" },
  };
};

const Page = ({
  unlockables,
  query,
}: {
  unlockables: UnlockableV2[];
  query?: string;
}) => {
  if (unlockables.length === 0) {
    return (
      <FourOhFour
        label={
          query
            ? `No Unlockables by '${truncate0x(query)}' could be found.`
            : "This LoopGate Instance does not have any Unlockables yet."
        }
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
