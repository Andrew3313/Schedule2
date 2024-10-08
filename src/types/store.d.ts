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
  setSelectedCourse: (course: number) => void;
  setFaculty: (faculty: string) => void;
  setGroup: (group: string) => void;
  setWeek: (week: string) => void;
  setDay: (day: string) => void;
  setLoading: (loading: boolean) => void;
  setDayEn: (dayEn: string) => void;
  setPresentDay: (today: string) => void;
  setCurrentWeek: (currentWeek: string) => void;
  setGroupAuth: (groupAuth: string) => void;
}
