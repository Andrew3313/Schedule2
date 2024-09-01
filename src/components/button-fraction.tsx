import React from "react";
import cn from "classnames";
import { useStore } from "../store/store";

interface Props {
  fraction: string;
  className: string;
  isLoading: boolean;
  error: null | Error;
}

export const ButtonFraction: React.FC<Props> = ({
  fraction,
  className,
  isLoading,
  error,
}) => {
  const week = useStore((state) => state.week);
  const setWeek = useStore((state) => state.setWeek);

  const handleWeekChange = () => {
    if (fraction === "ЧИСЛИТЕЛЬ") {
      setWeek("ЧИСЛИТЕЛЬ");
    } else if (fraction === "ЗНАМЕНАТЕЛЬ") {
      setWeek("ЗНАМЕНАТЕЛЬ");
    }
  };
  return (
    <button
      onClick={handleWeekChange}
      className={cn(
        "bg-primary border-none text-[1.8rem] font-light text-textPrimary cursor-pointer transition duration-100 ease-out",
        {
          "!bg-accent": fraction === week,
        },
        className
      )}
      disabled={isLoading || !!error}
    >
      {isLoading ? "" : fraction}
    </button>
  );
};
