import { Course } from './course';

export interface GetCoursesResponse {
  successful: boolean;
  result: Course[];
}

export interface GetCourseResponse {
  successful: boolean;
  result: Course;
}
