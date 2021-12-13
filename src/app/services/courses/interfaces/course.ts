import { CoursePayload } from './coursePayload';

export interface Course extends CoursePayload {
  creationDate: string;
  id: string;
}
