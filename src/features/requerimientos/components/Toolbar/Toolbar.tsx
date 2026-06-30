import type { ReactNode } from "react";

type ToolbarProps = {
  children: ReactNode;
};

export const Toolbar = ({ children }: ToolbarProps) => {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      {children}
    </div>
  );
}