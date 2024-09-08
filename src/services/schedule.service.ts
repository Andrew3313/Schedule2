import axios from "axios";
import {
  ICoursesByFaculty,
  ICurrentDay,
  IFaculties,
  IGetUser,
  IGroupsByCourseAndFaculty,
  IScheduleByGroup,
} from "../types";

class ScheduleService {
  private URL1 = "https://api.schedule.vingp.dev/api/v1/schedule";
  private URL2 = "https://user.schedule.vingp.dev/user";

  async getFaculties() {
    try {
      return await axios.get<IFaculties>(`${this.URL1}/faculties`);
    } catch (error) {
      throw error;
    }
  }

  async getCoursesByFaculty(faculty: string) {
    try {
      return await axios.get<ICoursesByFaculty>(
        `${this.URL1}/courses?faculty=${faculty}`
      );
    } catch (error) {
      throw error;
    }
  }

  async getGroupsByCourseAndFaculty(faculty: string, course: number) {
    try {
      return await axios.get<IGroupsByCourseAndFaculty>(
        `${this.URL1}/groups?faculty=${faculty}&course=${course}`
      );
    } catch (error) {
      throw error;
    }
  }

  async getScheduleByGroup(group: string) {
    try {
      return await axios.get<IScheduleByGroup>(`${this.URL1}/groups/${group}`);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentDay() {
    try {
      return await axios.get<ICurrentDay>(`${this.URL1}/day`);
    } catch (error) {
      throw error;
    }
  }

  async getUser(initDataRaw: string | undefined, id: number) {
    try {
      const response = await axios.get<IGetUser>(
        `${this.URL2}/${id}`,
        {
          headers: {
            authorization: `tma ${initDataRaw}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const scheduleService = new ScheduleService();
