import { supabase } from "@/src/utils/supabase/supabaseClient";
import { GetServerSideProps } from "next";
import { Database } from "@/src/utils/supabase/types";

type Country = Database["public"]["Tables"]["countries"]["Row"];
type Countries = Country[];

const Page = ({ allCountries }: { allCountries: Countries }) => {
  console.log(allCountries);

  return (
    <ul>
      {allCountries.map((country) => (
        <li key={country.id}>{country.name}</li>
      ))}
    </ul>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await supabase.from("countries").select();

  return {
    props: {
      allCountries: data.data,
    },
  };
};

export default Page;
