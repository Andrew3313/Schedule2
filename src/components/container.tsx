import React from "react";
import cn from "classnames";

interface IProps {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<IProps>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-[39rem] h-screen overflow-auto text-textPrimary pt-[1.5rem] px-[1.5rem] pb-[2.5rem]",
        className
      )}
    >
      {children}
    </div>
  );
};
