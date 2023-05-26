import Header from "../Header";
import Footer from "../Footer";
import { ReactNode } from "react";
import { techPattern } from "@/src/styles/inline-styles";
import { cn } from "@/src/utils/generic";

type Props = {
  containerClass: string;
  children: ReactNode | ReactNode[];
};

const Layout = ({ containerClass, children }: Props) => {
  return (
    <div
      className="min-h-screen h-full flex flex-col bg-center"
      style={techPattern}
    >
      <Header />
      <div className={cn(`flex-grow`, containerClass)}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
