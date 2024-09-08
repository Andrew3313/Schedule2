import React from "react";
import { Container, Footer, Header, Schedule } from "./components";
import { useTelegramWebApp } from "./hooks/useTelegramWebApp";
import { useScheduleByGroup } from "./hooks/useScheduleByGroup";
import { useStore } from "./store/store";

export const Main: React.FC = () => {
  const groupAuth = useStore((state) => state.groupAuth);
  const group = useStore((state) => state.group);
  useTelegramWebApp();
  const setGroup = useStore((state) => state.setGroup);
  const setSelectedCourse = useStore((state) => state.setSelectedCourse);
  const setFaculty = useStore((state) => state.setFaculty);
  const setGroupAuth = useStore((state) => state.setGroupAuth);

  const { data, isLoading, isSuccess, error } = useScheduleByGroup(
    groupAuth ? groupAuth : group ? group : ""
  );

  React.useEffect(() => {
    if (data && isSuccess) {
      setFaculty(data.faculty)
      setSelectedCourse(data.course)
      setGroup(data.group)
      setGroupAuth("");
    }
  });

  return (
    <Container>
      <div className="min-h-[calc(100vh-14rem)]">
        <Header />
        <Schedule data={data} isLoading={isLoading} isSuccess={isSuccess} error={error} />
      </div>
      <Footer />
    </Container>
  );
};
