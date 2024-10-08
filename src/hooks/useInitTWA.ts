import React from "react";
import { useStore } from "../store/store";
import { initSwipeBehavior, retrieveLaunchParams } from "@telegram-apps/sdk";
import { scheduleService } from "../services/schedule.service";

export const useInitTWA = () => {
  const setGroupAuth = useStore((state) => state.setGroupAuth);

  React.useEffect(() => {
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
      } catch (error) {
        console.log("Error initializing Telegram Web App:", error);
      }
    };

    initializeTelegramWebApp();
  }, []);
};
