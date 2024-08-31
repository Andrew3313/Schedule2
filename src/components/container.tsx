import cn from "classnames";
import React from "react";

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-[39rem] bg-background h-screen overflow-auto text-textPrimary pt-[1.5rem] px-[1.5rem]",
        className
      )}
    >
      {children}
    </div>
  );
};
