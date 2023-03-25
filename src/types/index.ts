export interface User {
  name: string;
}

export interface RoomData {
  users: User[];
  contents: string;
}

export interface OtherUserCursor {
  user: User;
  selectionEnd: number;
}
