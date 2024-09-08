import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../services/schedule.service";

export const useScheduleByGroup = (group: string) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["schedule", group],
    queryFn: () => scheduleService.getScheduleByGroup(group),
    select: (data) => data.data,
    enabled: !!group, 
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    error,
    isSuccess,
  };
};
