export interface IStore {
  selectedCourse: number;
  faculty: string;
  group: string | null;
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
  monday: Pair[];
  tuesday: Pair[];
  wednesday: Pair[];
  thursday: Pair[];
  friday: Pair[];
  saturday: Pair[];
}

export interface Pair {
  time: string;
  lesson: string;
}

export interface ICurrentDay {
  week_type: string;
  day: string;
  day_ru: string;
}
