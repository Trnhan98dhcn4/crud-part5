export interface IStudent {
  id: number;
  name: string;
  age: string;
  gender: string;
  address: string;
  date: Date;
  search: string;
}

export interface IStudentSate {
  students: IStudent[];
  searchItem: string;
  currentPage: number;
  pageSize: number;
}
