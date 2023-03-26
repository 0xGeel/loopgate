import { fetchUnlockableByUuid } from "@/src/utils/generic";
import Layout from "@/src/components/UnlockablePage/Layout";
import FourOhFour from "@/src/components/UnlockablePage/404";
import UnlockCard from "@/src/components/UnlockablePage/UnlockCard/UnlockCard";
import { GetServerSideProps } from "next";
import parseSqlUnlockable from "@/src/utils/supabase/helpers/parseSqlUnlockable";

// To do: automatic Supabase Typescript types

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3000, stale-while-revalidate=5000"
  );

  const { query } = context;

  const uuidRegex =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  if (
    !query.uuid ||
    Array.isArray(query.uuid) ||
    !uuidRegex.test(query.uuid as string)
  ) {
    return {
      props: { unlockable: null },
    };
  }
  const supabaseUnlockable = await fetchUnlockableByUuid(query.uuid);

  if (!supabaseUnlockable) {
    return {
      props: { unlockable: null },
    };
  }

  const unlockable = parseSqlUnlockable(supabaseUnlockable);

  return {
    props: { unlockable: unlockable },
  };
};

const Page = ({ unlockable }: { unlockable: any }) => {
  if (!unlockable) {
    return <FourOhFour />;
  }

  return (
    <Layout containerClass="flex-grow flex items-center justify-center">
      <UnlockCard unlockable={unlockable} />
    </Layout>
  );
};

export default Page;
