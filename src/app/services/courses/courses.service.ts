import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { apiUrls, BASE_URL } from '../../apiUrls';
import { catchError, map } from 'rxjs/operators';
import { Course } from './interfaces/course';
import { GetCourseResponse, GetCoursesResponse } from './interfaces/courseResponses';
import { CoursePayload } from './interfaces/coursePayload';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Course[]> {
    return this.http.get<GetCoursesResponse>(BASE_URL + apiUrls.COURSES.GET_ALL).pipe(map(({ result }) => result));
  }

  public filterCourses(filterAction: { filterStr: string }): Observable<Course[]> {
    return this.http
      .get<GetCoursesResponse>(BASE_URL + apiUrls.COURSES.FILTER_COURSES + filterAction.filterStr)
      .pipe(map(({ result }) => result));
  }

  public addCourse(course: CoursePayload): Observable<any> {
    return this.http.post<any>(BASE_URL + apiUrls.COURSES.ADD_COURSE, course).pipe(
      catchError((err) => {
        console.error(err);
        return of(err);
      })
    );
  }

  public editCourse(id: string, course: CoursePayload): Observable<any> {
    return this.http.put<any>(BASE_URL + apiUrls.COURSES.UPDATE_COURSE + id, course);
  }

  public getCourse(getSingleCourseAction: { id: string }): Observable<Course> {
    return this.http
      .get<GetCourseResponse>(BASE_URL + apiUrls.COURSES.GET_COURSE + getSingleCourseAction.id)
      .pipe(map(({ result }) => result));
  }

  public deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(BASE_URL + apiUrls.COURSES.DELETE_COURSE + id);
  }
}
