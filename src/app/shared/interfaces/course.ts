export interface Course {
  id: number;
  title: string;
  description: string;
  authors: string[];
  duration: number;
  created: string | Date;
}
