export interface User {
  name: string;
}

export interface Room {
  users: User[];
  contents: string;
}

export interface OtherUserCursor {
  user: User;
  selectionEnd: number;
}
