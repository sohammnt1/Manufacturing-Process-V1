export interface IEmployee {
  _id: string;
  employeeId: string;
  name: string;
  email: string;
  role: string;
  shift: string[];
  password: string;
  deleted: boolean;
}
