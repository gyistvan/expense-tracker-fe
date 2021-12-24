import { UserResponse } from '../../user/interfaces/userResponse';

export interface Group {
  name: string;
  _id: string;
  createdAt: string;
  groupId: string;
  members: GroupMember[];
  invited: Record<string, string>;
  __v: number;
}

export interface GroupPayload {
  name: string;
  groupId: string;
}

export interface GroupMember {
  id: string;
  name: string;
  email: string;
}

export interface GroupInvitePayload {
  email: string;
}

export interface AcceptGroupResponse {
  group: Group;
  userResponse: UserResponse;
}
