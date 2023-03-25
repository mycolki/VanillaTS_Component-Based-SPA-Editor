export interface User {
  name: string;
}

export interface RoomData {
  users: User[];
  contents: string;
}

export interface CursorData {
  user: User;
  selectionEnd: number;
}
