import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../services/schedule.service";

export const useCurrentDay = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["day"],
    queryFn: () => scheduleService.getCurrentDay(),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

  return {
    currentDayAPI: data,
    isLoading,
    error,
  };
};