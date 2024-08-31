import React from "react";
import cn from "classnames";
import { useStore } from "../store/store";

interface Props {
  day: string;
  className: string;
  isLoading: boolean;
  error: null | Error;
}

export const Day: React.FC<Props> = ({ day, isLoading, error, className }) => {
  const currentDay = useStore((state) => state.day);
  const setCurrentDay = useStore((state) => state.setDay);
  const setCurrentDayEn = useStore((state) => state.setDayEn);

  const handleDayChange = () => {
    switch (day) {
      case "Пн":
        setCurrentDay("Пн");
        setCurrentDayEn("Monday");
        break;
      case "Вт":
        setCurrentDay("Вт");
        setCurrentDayEn("Tuesday");
        break;
      case "Ср":
        setCurrentDay("Ср");
        setCurrentDayEn("Wednesday");
        break;
      case "Чт":
        setCurrentDay("Чт");
        setCurrentDayEn("Thursday");
        break;
      case "Пт":
        setCurrentDay("Пт");
        setCurrentDayEn("Friday");
        break;
      case "Сб":
        setCurrentDay("Сб");
        setCurrentDayEn("Saturday");
        break;
      default:
        break;
    }
  };

  return (
    <button
      className={cn(
        "bg-primary border-none text-[1.8rem] font-light text-textPrimary",
        {
          "rounded-l-[1rem]": day === "Пн",
          "rounded-br-[1rem]": day === "Ср",
          "rounded-bl-[1rem]": day === "Чт",
          "rounded-r-[1rem]": day === "Сб",
        },
        {
          "!bg-accent": day === currentDay,
        },
        className
      )}
      onClick={handleDayChange}
      disabled={isLoading || !!error}
    >
      {isLoading ? "" : day}
    </button>
  );
};
