import React from "react";
import moment from "moment";
import cn from "classnames";
import { useStore } from "../store/store";
import { useScheduleByGroup } from "../hooks/useScheduleByGroup";
import { IDays, ISchedule, Pair } from "../types";
import { useCurrentPairIndex } from "../hooks/useCurrentPairIndex";

export const Schedule: React.FC = () => {
  const group = useStore((state) => state.group);
  const week = useStore((state) => state.week);
  const dayEn = useStore((state) => state.dayEn);
  const setLoading = useStore((state) => state.setLoading);
  const [currentTime, setCurrentTime] = React.useState(
    moment().format("HH:mm")
  );
  const fraction: keyof ISchedule =
    week === "ЧИСЛИТЕЛЬ" ? "numerator" : "denominator";
  const { schedule, isLoading, isSuccess } = useScheduleByGroup(
    group as string
  );
  const [currentSchedule, setCurrentSchedule] = React.useState<Pair[]>([]);

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  React.useEffect(() => {
    if (schedule && isSuccess) {
      setCurrentSchedule(
        schedule[fraction][dayEn.toLowerCase() as keyof IDays] || []
      );
    }
  }, [schedule, isSuccess, fraction, dayEn]);

  const currentPairIndex = useCurrentPairIndex(currentSchedule, currentTime);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("HH:mm"));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col justify-center items-center">
      {isLoading ? (
        <div className="loader" />
      ) : currentSchedule.length > 0 ? (
        currentSchedule.map((pair, index) => (
          <div
            className={cn(
              "mb-[.5rem] py-[1.5rem] px-[1rem] w-full bg-primary rounded-[1rem]",
              {
                "border-[.2rem] border-solid border-accent":
                  currentPairIndex === index && currentPairIndex !== -1,
              }
            )}
            key={index}
          >
            <p
              className={cn(
                "flex items-center justify-center bg-secondary font-medium rounded-[.5rem] text-[1.5rem] w-[9rem] h-[2.3rem] mt-0 mb-[.5rem] mx-auto",
                {
                  "bg-accent":
                    currentPairIndex === index && currentPairIndex !== -1,
                }
              )}
            >
              {pair.time}
            </p>
            <p className="whitespace-pre-line text-center font-light text-[2rem] last:mb-[1.4rem]">
              {pair.lesson}
            </p>
          </div>
        ))
      ) : (
        isSuccess && (
          <div className="flex w-full justify-center py-[1.5rem] px-[1rem] rounded-[1rem] bg-primary mb-[.5rem] no-schedule">
            <h2 className="font-normal text-[1.5rem]">
              В этот день нет занятий
            </h2>
          </div>
        )
      )}
    </main>
  );
};
