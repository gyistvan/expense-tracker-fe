export interface ProfilePayload {
  name: string;
  email: string;
  groupId: string;
  pendingInvites: Record<string, string>;
}
