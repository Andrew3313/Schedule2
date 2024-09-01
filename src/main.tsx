import React from "react";
import { initSwipeBehavior } from "@telegram-apps/sdk";
import { Container, Footer, Header, Schedule } from "./components";

export const Main: React.FC = () => {

  React.useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      try {
        const [swipeBehavior] = initSwipeBehavior();
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        swipeBehavior.disableVerticalSwipe();
      } catch (error) {
        console.log("Error setting up swipe behavior:", error);
      }
    }
  }, []);

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
