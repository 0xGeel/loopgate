import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html
      lang="en"
      className="bg-slate-900 text-white scroll-smooth selection:bg-sky-500/20"
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
