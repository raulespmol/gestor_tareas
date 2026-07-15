import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";

type BadgeResponsableProps = {
  children: ReactNode;
};

export const BadgeResponsable = ({ children }: BadgeResponsableProps) => {
  return (
    <Badge className="bg-gray-50 text-gray-700 border-gray-700 dark:bg-gray-950 dark:text-gray-300">
      {children}
    </Badge>
  );
};
