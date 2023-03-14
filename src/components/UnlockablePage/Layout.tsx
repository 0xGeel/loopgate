import Header from "../Header";
import Footer from "../Footer";

type Props = {
  containerClass: string;
  children: JSX.Element;
};

const Layout = ({ containerClass, children }: Props) => {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />
      <div className={`flex-grow ${containerClass}`}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
