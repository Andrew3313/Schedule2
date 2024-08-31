import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../services/schedule.service";
import { hoursToMilliseconds } from "../lib/hours-to-milliseconds";

export const useGroupsByFacultyAndCourse = (
  faculty: string,
  course: number
) => {
  if (!faculty || !course)
    return {
      groups: undefined,
      isLoading: false,
      error: null,
    };
  const { data, isLoading, error } = useQuery({
    queryKey: ["groups", faculty, course],
    queryFn: () =>
      scheduleService.getGroupsByCourseAndFaculty(
        faculty.toLocaleLowerCase(),
        course
      ),
    select: (data) => data.data.groups,
    enabled: !!faculty || !!course,
    refetchOnWindowFocus: false,
    staleTime: hoursToMilliseconds(24),
  });

  return {
    groups: data,
    isLoading,
    error,
  };
};
