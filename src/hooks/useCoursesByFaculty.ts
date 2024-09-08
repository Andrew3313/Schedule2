import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../services/schedule.service";
import { hoursToMilliseconds } from "../lib/hours-to-milliseconds";

export const useCoursesByFaculty = (faculty: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["courses", faculty],
    queryFn: () =>
      scheduleService.getCoursesByFaculty(faculty.toLocaleLowerCase()),
    select: (data) => data.data.courses,
    enabled: !!faculty,
    refetchOnWindowFocus: false,
    staleTime: hoursToMilliseconds(24),
  });

  return {
    courses: data,
    isLoadingCourses: isLoading,
    errorCourses: error,
  };
};
