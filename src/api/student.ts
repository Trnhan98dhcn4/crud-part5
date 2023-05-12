import { IStudent } from "../model/index";
import { LOCAL_STORAGE } from "../constant/student.constant";

const studentStorage = localStorage.getItem(LOCAL_STORAGE.user);

const studentFake: IStudent[] = studentStorage
  ? JSON.parse(studentStorage)
  : [];

export default studentFake;
