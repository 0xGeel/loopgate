import { ReactNode } from "react";
import { cn } from "@/src/utils/generic";

export enum ColourModes {
  ACCENT = "accent",
  BASE = "base",
}

type Props = {
  title: string;
  description: string[];
  icon: ReactNode;
  colourMode: ColourModes;
  children: ReactNode | ReactNode[];
  className: string;
};

const Block = ({
  title,
  description,
  icon,
  colourMode,
  children,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        `rounded-lg p-5 lg:p-8 col-span-12 self-stretch flex flex-col items-start`,
        colourMode === ColourModes.ACCENT
          ? "text-slate-900 bg-gradient-to-r from-sky-200 via-sky-500 to-[#2E7EC8]"
          : "bg-white/5 text-white",
        className
      )}
    >
      <div
        className={cn(
          `p-2 rounded-lg bg-gradient-to-b from-white/40 to-white/10 inline-block`,
          colourMode === ColourModes.ACCENT
            ? "shadow-md shadow-slate-900/30"
            : ""
        )}
        style={{
          boxShadow:
            colourMode === ColourModes.ACCENT
              ? ""
              : `inset 0 0 0 1px rgba(255,255,255,.1)`,
        }}
      >
        {icon}
      </div>
      <h2 className="font-display font-semibold mt-6">{title}</h2>
      {description.map((item) => (
        <p
          className={cn(
            `mt-3 leading-relaxed`,
            colourMode === ColourModes.ACCENT
              ? "text-slate-900"
              : "text-white/70"
          )}
          key={item}
        >
          {item}
        </p>
      ))}
      {children}
    </div>
  );
};

export default Block;
