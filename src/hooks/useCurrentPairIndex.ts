import moment from "moment";
import { Pair } from "../types";
import { useStore } from "../store/store";

export const useCurrentPairIndex = (schedule: Pair[], currentTime: string) => {
  const dayEn = useStore((state) => state.dayEn);
  const currentWeek = useStore((state) => state.currentWeek);
  const week = useStore((state) => state.week);
  const day = useStore((state) => state.day);
  const presentDay = useStore((state) => state.presentDay);

  if (!schedule || schedule.length === 0) {
    return -1;
  }

  if (currentWeek !== week) {
    return -1;
  }

  if (day !== presentDay) {
    return -1;
  }

  const daysOfTheWeek: Record<string, number> = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,
  };
  const currentDay = moment(currentTime, "HH:mm").day();

  if (currentDay !== daysOfTheWeek[dayEn.toLowerCase()]) {
    return -1;
  }

  for (let index = 0; index < schedule.length; index++) {
    const pairStart = moment(schedule[index].time.split("-")[0], "HH:mm");
    const pairEnd = moment(schedule[index].time.split("-")[1], "HH:mm");

    if (
      moment(currentTime, "HH:mm").isBetween(
        pairStart.clone().subtract(10, "minutes"),
        pairEnd
      )
    ) {
      return index;
    }
  }

  return -1;
};
