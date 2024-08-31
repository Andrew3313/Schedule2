import React from "react";
import { Container, Footer, Header, Schedule } from "./components";

export const Main: React.FC = () => {
  return (
    <Container>
      <div className="min-h-[calc(100vh-10rem)]">
      <Header />
      <Schedule />
      </div>
      <Footer />
    </Container>
  );
};
