import React from "react";
import cn from "classnames";
import { useStore } from "../store/store";

interface IProps {
  fraction: string;
  className: string;
  isLoading: boolean;
}

export const ButtonFraction: React.FC<IProps> = ({
  fraction,
  className,
  isLoading,
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
          "!bg-accent text-white": fraction === week,
        },
        className
      )}
      disabled={isLoading}
    >
      {isLoading ? "" : fraction}
    </button>
  );
};
