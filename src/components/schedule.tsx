import React from "react";
import moment from "moment";
import cn from "classnames";
import { useStore } from "../store/store";
import { IDays, ISchedule, IPair, IScheduleByGroup } from "../types/types";
import { useCurrentPairIndex } from "../hooks/useCurrentPairIndex";

interface IProps {
  data: IScheduleByGroup | undefined;
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
}

export const Schedule: React.FC<IProps> = ({
  data,
  isLoading,
  isSuccess,
  error,
}) => {
  const group = useStore((state) => state.group);
  const faculty = useStore((state) => state.faculty);
  const week = useStore((state) => state.week);
  const dayEn = useStore((state) => state.dayEn);
  const setLoading = useStore((state) => state.setLoading);

  const [currentTime, setCurrentTime] = React.useState(
    moment().format("HH:mm")
  );
  const [currentSchedule, setCurrentSchedule] = React.useState<IPair[]>([]);

  const fraction: keyof ISchedule =
    week === "ЧИСЛИТЕЛЬ" ? "numerator" : "denominator";

  const currentPairIndex = useCurrentPairIndex(currentSchedule, currentTime);

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  React.useEffect(() => {
    if (data && isSuccess) {
      const newSchedule =
        data.schedule[fraction][dayEn.toLowerCase() as keyof IDays] || [];
      setCurrentSchedule(newSchedule);
    }
  }, [data, isSuccess, fraction, dayEn]);

  React.useEffect(() => {
    const updateTime = () => setCurrentTime(moment().format("HH:mm"));
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col justify-center items-center">
      {error && (
        <div className="flex w-full justify-center py-[1.5rem] px-[1rem] rounded-[1rem] bg-primary mb-[.5rem] no-schedule">
          <h2 className="font-normal text-[1.5rem]">
            Ошибка загрузки расписания
          </h2>
        </div>
      )}
      {(!faculty || !group) && (
        <div className="flex w-full justify-center py-[1.5rem] px-[1rem] rounded-[1rem] bg-primary mb-[.5rem] no-schedule">
          <h2 className="font-normal text-[1.5rem]">
            Выберите факультет и группу
          </h2>
        </div>
      )}
      {isLoading ? (
        <div className="loader" />
      ) : currentSchedule.length > 0 && group && faculty ? (
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
                  "!bg-accent text-white":
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
