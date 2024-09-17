import React from "react";
import cn from "classnames";
import { Course } from "./course";
import { DropDownGroup } from "./drop-down-group";
import { ButtonFraction } from "./button-fraction";
import { Day } from "./day";
import { DropDownDepartment } from "./drop-down-department";
import { useStore } from "../store/store";
import { useCurrentDay } from "../hooks/useCurrentDay";
import { days, fraction } from "../constants";
import { useCoursesByFaculty } from "../hooks/useCoursesByFaculty";
import { useGroupsByFacultyAndCourse } from "../hooks/useGroupsByFacultyAndCourse";
import { useFaculty } from "../hooks/useFaculty";

export const TopBar: React.FC = () => {
  const setCurrentDay = useStore((state) => state.setDay);
  const setCurrentDayEn = useStore((state) => state.setDayEn);
  const setWeek = useStore((state) => state.setWeek);
  const setPresentDay = useStore((state) => state.setPresentDay);
  const setCurrentWeek = useStore((state) => state.setCurrentWeek);
  const selectedCourse = useStore((state) => state.selectedCourse);
  const faculty = useStore((state) => state.faculty);
  const loading = useStore((state) => state.loading);

  const { faculties, isLoadingFaculties, errorFaculties } = useFaculty();

  const { courses, isLoadingCourses, errorCourses } = useCoursesByFaculty(
    faculty || ""
  );

  const { groups, isLoadingDDG, errorDDG } = useGroupsByFacultyAndCourse(
    faculty || "",
    selectedCourse
  );

  const { currentDayAPI, isLoadingDay, errorDay } = useCurrentDay();

  React.useEffect(() => {
    if (currentDayAPI) {
      setCurrentDay(currentDayAPI.day_ru);
      setPresentDay(currentDayAPI.day_ru);
      setWeek(currentDayAPI.week_type.toLocaleUpperCase());
      setCurrentWeek(currentDayAPI.week_type.toLocaleUpperCase());
      setCurrentDayEn(currentDayAPI.day);
    }
  }, [currentDayAPI, isLoadingDay]);

  return (
    <header className="grid grid-cols-6 grid-rows-3 gap-[.5rem] mb-[.5rem]">
      <Course
        courses={courses}
        isLoading={isLoadingCourses}
        error={errorCourses}
        className="col-span-1 "
      />

      <DropDownDepartment
        faculties={faculties || []}
        error={errorFaculties}
        isLoading={isLoadingFaculties}
        className="col-span-3"
      />

      <DropDownGroup
        groups={groups}
        error={errorDDG}
        isLoading={isLoadingDDG}
        className="col-span-2"
      />

      {fraction.map((fraction) => (
        <ButtonFraction
          key={fraction}
          fraction={fraction}
          className={cn("col-span-3", {
            "rounded-bl-[1rem]": fraction === "ЧИСЛИТЕЛЬ",
            "rounded-br-[1rem]": fraction === "ЗНАМЕНАТЕЛЬ",
          })}
          isLoading={loading}
        />
      ))}

      {days.map((day) => (
        <Day
          key={day}
          day={day}
          className="col-span-1"
          isLoading={isLoadingDay}
          error={errorDay}
        />
      ))}
    </header>
  );
};
