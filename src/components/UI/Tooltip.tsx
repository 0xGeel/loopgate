import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/src/utils/generic";

interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
  // open?: boolean;
  onOpenChange?: () => void;
  defaultOpen?: boolean;
}

const Tooltip = ({
  children,
  content,
  // open = false,
  defaultOpen = false,
  onOpenChange,
  ...props
}: Props) => {
  return (
    <TooltipPrimitive.Root
      // open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        side="top"
        sideOffset={2}
        align="center"
        className={cn(
          "bg-sky-400 rounded-md px-2.5 py-1 text-sm text-slate-900",
          "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade will-change-[transform,opacity]"
        )}
        {...props}
      >
        {content}
        <TooltipPrimitive.Arrow
          width={11}
          height={5}
          className="fill-sky-400"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
};

export default Tooltip;
