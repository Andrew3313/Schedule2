import React from "react";
import { useStore } from "../store/store";
import { initSwipeBehavior, retrieveLaunchParams } from "@telegram-apps/sdk";
import { scheduleService } from "../services/schedule.service";

export const useTelegramWebApp = () => {
  const root = document.querySelector(":root");
  const setDarkTheme = useStore((state) => state.setDarkTheme);
  const setGroupAuth = useStore((state) => state.setGroupAuth);

  React.useLayoutEffect(() => {
    const initializeTelegramWebApp = async () => {
      const telegramWebApp = window.Telegram?.WebApp;

      if (!telegramWebApp) return;

      try {
        const { initDataRaw } = retrieveLaunchParams();
        const id = telegramWebApp.initDataUnsafe.user.id;
        const data = await scheduleService.getUser(initDataRaw, id);

        if (data?.group) {
          setGroupAuth(data.group);
        }

        const [swipeBehavior] = initSwipeBehavior();
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        swipeBehavior.disableVerticalSwipe();

        const theme = window.Telegram.WebApp.themeParams;
        if (!(theme?.bg_color === "#ffffff")) {
          root?.classList.add("dark");
          setDarkTheme();
        }
      } catch (error) {
        console.log("Error initializing Telegram Web App:", error);
      }
    };

    initializeTelegramWebApp();
  }, []);
};
