export interface UserResponse {
  email: string;
  name: string;
  groupId: string;
  pendingInvites: Record<string, string>;
}

export interface UserResponseFail {
  successful?: boolean;
  error?: string;
  message?: string;
  statusCode?: number;
}
