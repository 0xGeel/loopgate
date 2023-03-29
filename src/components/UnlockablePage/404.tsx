import Layout from "./Layout";
import Link from "next/link";

type Props = {
  label?: string;
};

const FourOhFour = ({ label }: Props) => {
  return (
    <Layout containerClass="flex flex-col items-center justify-center px-6 space-y-4">
      <>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-center">
          <span className="text-sky-400 animate-pulse">Four</span>
          &ndash;Oh&ndash;
          <span className="text-sky-400 animate-pulse">Four</span>
        </h1>
        <p className="text-white/70 text-center text-sm md:text-base pb-6">
          {label ? label : "The page you were looking for could not be found."}
        </p>
        <Link
          href="/"
          className="bg-white/5 text-white/70 hover:bg-white/10 hover:text-white active:scale-90 duration-150 rounded-md px-3 py-2 border border-white/10"
        >
          Go back home
        </Link>
      </>
    </Layout>
  );
};

export default FourOhFour;
