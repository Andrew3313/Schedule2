import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../services/schedule.service";
import { hoursToMilliseconds } from "../lib/hours-to-milliseconds";

export const useFaculty = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["faculties"],
    queryFn: () => scheduleService.getFaculties(),
    select: (data) => data.data.faculties,
    refetchOnWindowFocus: false,
    staleTime: hoursToMilliseconds(24),
  });

  return {
    faculties: data,
    isLoading,
    error,
  };
};