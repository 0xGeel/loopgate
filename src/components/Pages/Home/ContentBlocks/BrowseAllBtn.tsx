import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  label: string;
  url: string;
};

const Inner = ({ label }: { label: string }) => (
  <>
    <span>{label}</span>
    <ArrowLongRightIcon className="w-5 h-5" />
  </>
);

const CtaBtn = ({ label, url }: Props) => {
  const style =
    "inline-flex items-center space-x-2 bg-white/20 border border-white/10 text-slate-900 font-medium px-3 py-2 rounded-md hover:bg-white/30 duration-150 mt-6 shadow-md shadow-slate-900/20";

  return (
    <>
      {url.startsWith("#") ? (
        <a href={url} className={style}>
          <Inner label={label} />
        </a>
      ) : (
        <Link href={url} className={style}>
          <Inner label={label} />
        </Link>
      )}
    </>
  );
};

export default CtaBtn;
