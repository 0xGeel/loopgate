interface Props {
  url: string;
}

const VersionTag = ({ url }: Props) => {
  const version = process.env.NEXT_PUBLIC_APP_VERSION;

  return (
    <>
      {version && (
        <a
          className="bg-white/10 rounded-full px-2 text-xs py-1 hover:bg-sky-400 duration-150 cursor-pointer mt-1 overflow-hidden group"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          <span className="-ml-12 mr-1 opacity-0 text-white/70 group-hover:opacity-100 group-hover:-ml-0 group-hover:text-slate-900 duration-150">
            Version
          </span>
          <span className="text-white/70 group-hover:text-slate-900 duration-150">
            {version}
          </span>
          <span className="-ml-4 opacity-0 group-hover:opacity-100 group-hover:ml-1.5 group-hover:mr-0.5 duration-150">
            🚀
          </span>
        </a>
      )}
    </>
  );
};

export default VersionTag;
