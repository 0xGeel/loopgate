import {
  fetchUnlockableByUuid,
  findUnlockableByUuid,
} from "@/src/utils/generic";
import Layout from "@/src/components/UnlockablePage/Layout";
import FourOhFour from "@/src/components/UnlockablePage/404";
import UnlockCard from "@/src/components/UnlockablePage/UnlockCard/UnlockCard";
import { GetServerSideProps } from "next";
import { UnlockableV2 } from "@/src/config/types";
import { isUuid } from "@/src/utils/supabase/helpers";
import NextHeadBase from "@/src/components/SEO/NextHeadBase";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3000, stale-while-revalidate=5000"
  );

  const { query } = context;

  if (
    !query.uuid ||
    Array.isArray(query.uuid) ||
    !isUuid(query.uuid as string)
  ) {
    return {
      props: { unlockable: null },
    };
  }

  const unlockable =
    process.env.LOOPGATE_MODE === "supabase"
      ? await fetchUnlockableByUuid(query.uuid) // Use Supabase as the source for the Unlockables
      : findUnlockableByUuid(query.uuid); // Use the 'config.ts' file as the source for the Unlockables

  if (!unlockable) {
    return {
      props: { unlockable: null },
    };
  }

  return {
    props: { unlockable: unlockable },
  };
};

const Page = ({ unlockable }: { unlockable: UnlockableV2 | null }) => {
  if (!unlockable) {
    return (
      <FourOhFour
        label={"The unlockable you were looking for could not be found... 😭"}
      />
    );
  }

  return (
    <Layout containerClass="flex-grow flex items-center justify-center">
      <NextHeadBase
        title={`Unlock ${
          unlockable.metadata.name
            ? "'" + unlockable.metadata.name + "'"
            : "This token-gated content"
        } on LoopGate`}
        ogImgUrl="/images/unlocks-og-image.png"
      />
      <UnlockCard unlockable={unlockable} />
    </Layout>
  );
};

export default Page;
