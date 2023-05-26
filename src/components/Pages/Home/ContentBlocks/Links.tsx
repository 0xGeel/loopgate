type Link = {
  icon: React.ReactNode;
  label: string;
  url: string;
};

type Props = {
  title: string;
  links: Link[];
};

const Links = ({ title, links }: Props) => {
  return (
    <div className="rounded-md border border-white/10 mt-6 md:mt-10 overflow-hidden w-full">
      <p className="text-sm text-white/50 px-3 py-2">{title}</p>
      {links.map((item) => (
        <a
          key={item.label}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 px-3 py-2 hover:bg-sky-500/10 duration-150 text-white/80 hover:text-white text-sm"
        >
          {item.icon}
          <span>{item.label}</span>
        </a>
      ))}
    </div>
  );
};

export default Links;
