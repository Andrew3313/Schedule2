import React from "react";
import { Container, Footer, Schedule, TopBar } from "./components";
import { useTelegramWebApp } from "./hooks/useTelegramWebApp";
import { useStore } from "./store/store";
import { useScheduleByGroup } from "./hooks/useScheduleByGroup";

export const Main: React.FC = () => {
  useTelegramWebApp();
  const groupAuth = useStore((state) => state.groupAuth);
  const group = useStore((state) => state.group);
  const setGroup = useStore((state) => state.setGroup);
  const setSelectedCourse = useStore((state) => state.setSelectedCourse);
  const setFaculty = useStore((state) => state.setFaculty);
  const setGroupAuth = useStore((state) => state.setGroupAuth);

  const { data, isLoading, isSuccess, error } = useScheduleByGroup(
    groupAuth ? groupAuth : group ? group : ""
  );

  React.useEffect(() => {
    if (data && isSuccess) {
      setFaculty(data.faculty);
      setSelectedCourse(data.course);
      setGroup(data.group);
      setGroupAuth("");
    }
  });

  return (
    <Container>
      <div className="min-h-[calc(100vh-11rem)]">
        <TopBar />
        <Schedule
          data={data}
          isLoading={isLoading}
          isSuccess={isSuccess}
          error={error}
        />
      </div>
      <Footer />
    </Container>
  );
};
