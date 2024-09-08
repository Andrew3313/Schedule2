import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { IStore } from "../types";

export const useStore = create<IStore>()(
  devtools(
    persist(
      (set) => ({
        selectedCourse: 1,
        faculty: "",
        group: "",
        groupAuth: "",
        week: "",
        day: "",
        dayEn: "",
        presentDay: "",
        currentWeek: "",
        loading: false,
        darkTheme: true,
        setFaculty: (faculty) =>
          set((state) => ({
            ...state,
            faculty,
          })),
        setSelectedCourse: (course) =>
          set((state) => ({
            ...state,
            selectedCourse: course,
          })),
        setGroup: (group) =>
          set((state) => ({
            ...state,
            group,
          })),
        setWeek: (week) =>
          set((state) => ({
            ...state,
            week,
          })),
        setDay: (day) =>
          set((state) => ({
            ...state,
            day,
          })),
        setLoading: (loading) =>
          set((state) => ({
            ...state,
            loading,
          })),
        setDayEn: (dayEn) =>
          set((state) => ({
            ...state,
            dayEn,
          })),
        setPresentDay: (presentDay) =>
          set((state) => ({
            ...state,
            presentDay,
          })),
        setCurrentWeek: (currentWeek) =>
          set((state) => ({
            ...state,
            currentWeek,
          })),
        setDarkTheme: () =>
          set((state) => ({
            ...state,
            darkTheme: !state.darkTheme,
          })),
        setGroupAuth: (groupAuth) =>
          set((state) => ({
            ...state,
            groupAuth,
          })),
      }),
      {
        name: "schedule-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          selectedCourse: state.selectedCourse,
          faculty: state.faculty,
          group: state.group,
        }),
      }
    )
  )
);
