import React from "react";
import cn from "classnames";
import { useStore } from "../store/store";

interface IProps {
  className: string;
  courses: number[] | undefined;
  isLoading: boolean;
  error: null | Error;
}

export const Course: React.FC<IProps> = ({
  courses,
  isLoading,
  error,
  className,
}) => {
  const selectedCourse = useStore((state) => state.selectedCourse);
  const setSelectedCourse = useStore((state) => state.setSelectedCourse);
  const faculty = useStore((state) => state.faculty);

  const handleCourseChange = () => {
    if (courses) {
      if (selectedCourse < courses?.length) {
        setSelectedCourse(selectedCourse + 1);
      } else {
        setSelectedCourse(1);
      }
    }
  };

  React.useEffect(() => {
    if (courses && !courses?.includes(selectedCourse)) {
      setSelectedCourse(1);
    }
  }, [faculty, courses]);

  return (
    <button
      onClick={handleCourseChange}
      disabled={isLoading || !courses || !!error || !faculty}
      className={cn(
        "course text-[2rem] cursor-pointer border-none bg-primary w-[5.5rem] h-[5rem] rounded-tl-[1rem]",
        {
          "!cursor-default": isLoading || !courses || !!error || !faculty,
        },
        className,
        isLoading && "cursor-not-allowed"
      )}
    >
      {isLoading ? "" : selectedCourse}
    </button>
  );
};
