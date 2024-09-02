import React from "react";
import { initSwipeBehavior } from "@telegram-apps/sdk";
import { Container, Footer, Header, Schedule } from "./components";
import { TelegramWebApp } from "./types";
import { useStore } from "./store/store";

export const Main: React.FC = () => {
  const root = document.querySelector(":root");
  const setDarkTheme = useStore((state) => state.setDarkTheme);
  React.useEffect(() => {
    const telegramWebApp = window.Telegram?.WebApp as
      | TelegramWebApp
      | undefined;

    if (telegramWebApp) {
      try {
        const [swipeBehavior] = initSwipeBehavior();
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        swipeBehavior.disableVerticalSwipe();

        const theme = window.Telegram.WebApp.themeParams;

        if (theme) {
          if (theme.bg_color === "#ffffff" || theme.bg_color === "#F0F0F0") {
            root?.classList.add("light");
            setDarkTheme();
          }
        }
      } catch (error) {
        console.log("Error setting up swipe behavior:", error);
      }
    }
  }, []);

  return (
    <Container>
      <div className="min-h-[calc(100vh-12rem)]">
        <Header />
        <Schedule />
      </div>
      <Footer />
    </Container>
  );
};
