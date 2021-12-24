import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls, BASE_URL } from '../../../apiUrls';
import {
  AcceptGroupResponse,
  Group,
  GroupInvitePayload,
  GroupPayload,
} from './interfaces/group';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  public get(id: string): Observable<Group> {
    return this.http
      .get<Group[]>(BASE_URL + apiUrls.GROUP.GET + id)
      .pipe(map((groups: Group[]) => groups[0]));
  }

  public createGroup(groupPayload: GroupPayload): Observable<Group> {
    return this.http.post<Group>(BASE_URL + apiUrls.GROUP.CREATE, groupPayload);
  }

  public groupInvite(
    groupInvitePayload: GroupInvitePayload,
    id: string
  ): Observable<Group> {
    return this.http.put<Group>(
      BASE_URL + apiUrls.GROUP.INVITE_PREFIX + id + apiUrls.GROUP.INVITE_SUFFIX,
      groupInvitePayload
    );
  }

  public acceptInvite(id: string): Observable<AcceptGroupResponse> {
    return this.http.get<AcceptGroupResponse>(
      BASE_URL + apiUrls.GROUP.INVITE_PREFIX + id + apiUrls.GROUP.INVITE_SUFFIX
    );
  }
}
