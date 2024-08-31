import axios from "axios";
import {
  ICoursesByFaculty,
  ICurrentDay,
  IFaculties,
  IGroupsByCourseAndFaculty,
  IScheduleByGroup,
} from "../types";

class ScheduleService {
  private URL = "https://api.schedule.vingp.dev/api/v1/schedule";

  async getFaculties() {
    try {
      return await axios.get<IFaculties>(`${this.URL}/faculties`);
      // return axios.get<IFaculties>(`${this.URL}/faculties`);
    } catch (error) {
      throw error;
    }
  }

  async getCoursesByFaculty(faculty: string) {
    try {
      return await axios.get<ICoursesByFaculty>(
        `${this.URL}/courses?faculty=${faculty}`
      );
    } catch (error) {
      throw error;
    }
  }

  async getGroupsByCourseAndFaculty(faculty: string, course: number) {
    try {
      return await axios.get<IGroupsByCourseAndFaculty>(
        `${this.URL}/groups?faculty=${faculty}&course=${course}`
      );
    } catch (error) {
      throw error;
    }
  }

  async getScheduleByGroup(group: string) {
    try {
      return await axios.get<IScheduleByGroup>(`${this.URL}/groups/${group}`);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentDay() {
    try {
      return await axios.get<ICurrentDay>(`${this.URL}/day`);
    } catch (error) {
      throw error;
    }
  }
}

export const scheduleService = new ScheduleService();
