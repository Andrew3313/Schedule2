import React from "react";
import cn from "classnames";
import { useStore } from "../store/store";
import { useCoursesByFaculty } from "../hooks/useCoursesByFaculty";

interface Props {
  className: string;
}

export const Course: React.FC<Props> = ({ className }) => {
  const selectedCourse = useStore((state) => state.selectedCourse);
  const setSelectedCourse = useStore((state) => state.setSelectedCourse);
  const faculty = useStore((state) => state.faculty);

  const { courses, isLoading, error } = useCoursesByFaculty(faculty);

  const handleCourseChange = () => {
    if (courses) {
      if (selectedCourse < courses?.length) {
        setSelectedCourse(selectedCourse + 1);
      } else {
        setSelectedCourse(1);
      }
    }
  };

  return (
    <button
      onClick={handleCourseChange}
      disabled={isLoading || !courses || !!error}
      className={cn(
        "course text-[2rem] cursor-pointer border-none bg-primary w-[5.5rem] h-[5rem] rounded-tl-[1rem]", 
        className,
        isLoading && "cursor-not-allowed"
      )}
    >
      {isLoading ? "" : selectedCourse}
    </button>
  );
};
