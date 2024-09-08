declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export interface ThemeParams {
  bg_color: string;
  text_color: string;
  link_color: string;
}

export interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  initDataUnsafe: {
    user: {
      id: number;
      first_name: string;
    };
  };
  themeParams: ThemeParams;
}

export interface IStore {
  selectedCourse: number;
  faculty: string;
  group: string;
  groupAuth: string;
  week: string;
  day: string;
  dayEn: string;
  presentDay: string;
  currentWeek: string;
  loading: boolean;
  darkTheme: boolean;
  setSelectedCourse: (course: number) => void;
  setFaculty: (faculty: string) => void;
  setGroup: (group: string) => void;
  setWeek: (week: string) => void;
  setDay: (day: string) => void;
  setLoading: (loading: boolean) => void;
  setDayEn: (dayEn: string) => void;
  setPresentDay: (today: string) => void;
  setCurrentWeek: (currentWeek: string) => void;
  setDarkTheme: () => void;
  setGroupAuth: (groupAuth: string) => void;
}

export interface IFaculties {
  faculties: string[];
}

export interface ICoursesByFaculty {
  faculty: string;
  courses: number[];
}

export interface IGroupsByCourseAndFaculty {
  course: number;
  faculty: string;
  groups: string[];
}

export interface IScheduleByGroup {
  id: string;
  update_at: Date;
  file: string;
  file_hash: string;
  faculty: string;
  course: number;
  group: string;
  schedule: ISchedule;
}

export interface ISchedule {
  numerator: IDays;
  denominator: IDays;
}

export interface IDays {
  monday: IPair[];
  tuesday: IPair[];
  wednesday: IPair[];
  thursday: IPair[];
  friday: IPair[];
  saturday: IPair[];
}

export interface IPair {
  time: string;
  lesson: string;
}

export interface ICurrentDay {
  week_type: string;
  day: string;
  day_ru: string;
}

export interface IGetUser {
  id: number;
  telegram_id: number;
  telegram_username: string;
  group: string | null;
  notification_sound: boolean;
}

export interface IFacultyAndCourseByGroup {
  faculty: string;
  course: number;
}
