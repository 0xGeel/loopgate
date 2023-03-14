import Layout from "./Layout";

const FourOhFour = () => {
  return (
    <Layout containerClass="flex flex-col items-center justify-center px-6 space-y-4">
      <>
        <h1 className="font-display text-5xl font-bold text-center">
          Four-<span className="text-sky-400">Oh</span>-Four
        </h1>
        <p className="text-white/70 text-center">
          The unlockable you were looking for could not be found... 😭
        </p>
      </>
    </Layout>
  );
};

export default FourOhFour;
