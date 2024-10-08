import axios from "axios";
import {
  ICoursesByFaculty,
  ICurrentDay,
  IFaculties,
  IGroupsByCourseAndFaculty,
  IScheduleByGroup,
} from "../types/schedule";
import { IGetUser } from "../types/user";

class ScheduleService {
  private URL1 = "https://api.schedule.vingp.dev/api/v1/schedule";
  private URL2 = "https://user.schedule.vingp.dev/user";

  async getFaculties() {
    return await axios.get<IFaculties>(`${this.URL1}/faculties`);
  }

  async getCoursesByFaculty(faculty: string) {
    return await axios.get<ICoursesByFaculty>(
      `${this.URL1}/courses?faculty=${faculty}`
    );
  }

  async getGroupsByCourseAndFaculty(faculty: string, course: number) {
    return await axios.get<IGroupsByCourseAndFaculty>(
      `${this.URL1}/groups?faculty=${faculty}&course=${course}`
    );
  }

  async getScheduleByGroup(group: string) {
    return await axios.get<IScheduleByGroup>(`${this.URL1}/groups/${group}`);
  }

  async getCurrentDay() {
    return await axios.get<ICurrentDay>(`${this.URL1}/day`);
  }

  async getUser(initDataRaw: string | undefined, id: number) {
    const response = await axios.get<IGetUser>(`${this.URL2}/${id}`, {
      headers: {
        authorization: `tma ${initDataRaw}`,
      },
    });

    return response.data;
  }
}

export const scheduleService = new ScheduleService();
