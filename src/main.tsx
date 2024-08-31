import React from "react";
import { Container, Footer, Header, Schedule } from "./components";

export const Main: React.FC = () => {
  return (
    <Container>
      <Header />
      <Schedule />
      <Footer />
    </Container>
  );
};
