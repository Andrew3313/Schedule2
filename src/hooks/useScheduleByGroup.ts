import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../services/schedule.service";

export const useScheduleByGroup = (group: string) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["schedule", group],
    queryFn: () => scheduleService.getScheduleByGroup(group),
    select: (data) => data.data.schedule,
    enabled: !!group,
    refetchOnWindowFocus: false,
  });

  return {
    schedule: data,
    isLoading,
    error,
    isSuccess,
  };
};
