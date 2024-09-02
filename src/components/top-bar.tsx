import React from "react";
import { Course } from "./course";
import { DropDownGroup } from "./drop-down-group";
import { ButtonFraction } from "./button-fraction";
import { Day } from "./day";
import { DropDownDepartment } from "./drop-down-department";
import { useStore } from "../store/store";
import { useCurrentDay } from "../hooks/useCurrentDay";
import cn from "classnames";

export const TopBar: React.FC = () => {
  const setCurrentDay = useStore((state) => state.setDay);
  const setCurrentDayEn = useStore((state) => state.setDayEn);
  const setWeek = useStore((state) => state.setWeek);
  const setPresentDay = useStore((state) => state.setPresentDay);
  const setCurrentWeek = useStore((state) => state.setCurrentWeek);
  const { currentDayAPI, isLoading, error } = useCurrentDay();
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const fraction = ["ЧИСЛИТЕЛЬ", "ЗНАМЕНАТЕЛЬ"];

  React.useEffect(() => {
    if (currentDayAPI) {
      setCurrentDay(currentDayAPI.day_ru);
      setPresentDay(currentDayAPI.day_ru);
      setWeek(currentDayAPI.week_type.toLocaleUpperCase());
      setCurrentWeek(currentDayAPI.week_type.toLocaleUpperCase());
      setCurrentDayEn(currentDayAPI.day);
    }
  }, [currentDayAPI]);

  return (
    <div className="grid grid-cols-6 grid-rows-3 gap-[.5rem] mb-[.5rem]">
      <Course className="col-span-1 " />

      <DropDownDepartment className="col-span-3" />
      <DropDownGroup className="col-span-2" />

      {fraction.map((fraction) => (
        <ButtonFraction
          key={fraction}
          fraction={fraction}
          className={cn("col-span-3", {
            "rounded-bl-[1rem]": fraction === "ЧИСЛИТЕЛЬ",
            "rounded-br-[1rem]": fraction === "ЗНАМЕНАТЕЛЬ",
          })}
          isLoading={isLoading}
          error={error}
        />
      ))}

      {days.map((day) => (
        <Day
          key={day}
          day={day}
          className="col-span-1"
          isLoading={isLoading}
          error={error}
        />
      ))}
    </div>
  );
};
