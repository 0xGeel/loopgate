import { useRouter } from "next/router";
import {
  fetchUnlockableByUuid,
  findUnlockableByUuid,
} from "@/src/utils/generic";
import Layout from "@/src/components/UnlockablePage/Layout";
import FourOhFour from "@/src/components/UnlockablePage/404";
import UnlockCard from "@/src/components/UnlockablePage/UnlockCard/UnlockCard";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  if (!query.uuid || Array.isArray(query.uuid)) {
    return {
      props: { message: "Nothing found" },
    };
  }
  const supabaseUnlockable = await fetchUnlockableByUuid(query.uuid);
  // To do: make supabaseUnlockable / getServerSideProps an async function
  // To do: make Supabase View of table to include NFT IDs in the response
  // To do: transform Supabase response to Type
  // To do: automatic Supabase Typescript types

  // console.log(supabaseUnlockable);

  if (!supabaseUnlockable) {
    return {
      props: { data: null },
    };
  }

  // To do: Parse the response.

  return {
    props: { data: supabaseUnlockable },
  };
};

const Page = ({ data }: { data: any }) => {
  const router = useRouter();
  const { uuid } = router.query;

  console.log(data);

  // ✅: Check if UUID exists in config.ts (if not: —> 404)
  // 1️⃣B: Replace config.ts with Supabase
  // ✅: Show unlock title and description
  // 3️⃣: NFT ID => NFT Datas
  // 4️⃣: Query NFT holders by looprings nftData
  // 5️⃣: 0x address => Account ID
  // 6️⃣: Check if user owns the NFT
  // 7️⃣: If so: generate Pinata Unlock Link & display
  // 7️⃣: If not: display no access.

  if (!uuid || Array.isArray(uuid)) {
    return;
  }

  // Todo: Move unlockable to ISR
  // Todo: update findUnlockableByUuid to retrieve content from DB instead of local config
  const unlockable = findUnlockableByUuid(uuid);
  // const supabaseUnlockable = fetchUnlockableByUuid(uuid);

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
