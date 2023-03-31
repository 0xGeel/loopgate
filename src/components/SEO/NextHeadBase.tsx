import Head from "next/head";

type Props = {
  title?: string;
  baseUrl?: string;
  ogImgUrl?: string;
  description?: string;
};

const NextHeadBase = ({
  title = "LoopGate — Token-Gated Content using Loopring NFTs",
  baseUrl = "https://loopgate.netlify.app/",
  ogImgUrl = `/images/og-image.png`,
  description = "Securely and easily access exclusive digital content with LoopGate, using Loopring NFTs.",
}: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:image" content={baseUrl + ogImgUrl} />
      <meta property="og:site_name" content="LoopGate" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={baseUrl + ogImgUrl} />
      <link rel="shortcut icon" href="/images/favicon.png" />
    </Head>
  );
};

export default NextHeadBase;
