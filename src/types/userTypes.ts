export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  tasks: string[];
  archive: string[];
  activity: string[];
}
