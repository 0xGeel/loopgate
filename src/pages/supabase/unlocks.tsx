import { supabase } from "@/src/utils/supabase/supabaseClient";
import { GetServerSideProps } from "next";
import { Database } from "@/src/utils/supabase/types";

type Unlock = Database["public"]["Tables"]["unlocks"]["Row"];
type Unlocks = Unlock[];

const UnlocksPage = ({ allUnlocks }: { allUnlocks: Unlocks }) => {
  console.log(allUnlocks);

  return (
    <>
      <h1 className="font-display font-bold text-2xl p-4 mt-4">
        Supabase res:
      </h1>
      <ul className="p-4 divide-y-2 space-y-2">
        {allUnlocks.map((unlock) => (
          <li
            className="py-2 flex flex-col font-display space-y-1 hover:bg-white/20 duration-150"
            key={unlock.id}
          >
            <div className="truncate">{unlock.cid}</div>
            <div className="truncate text-white/70 font-light text-xs">
              can be unlocked by owning{" "}
              <span className="truncate">{unlock.nftid}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await supabase.from("unlocks").select();

  return {
    props: {
      allUnlocks: data.data,
    },
  };
};

export default UnlocksPage;
