interface IFooterLink {
  href: string;
  children: JSX.Element | JSX.Element[] | string;
}

const FooterLink = ({ href, children }: IFooterLink) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-white/60 hover:text-sky-500 duration-150 inline-flex items-center space-x-1.5 justify-center"
    >
      {children}
    </a>
  );
};

export default FooterLink;
