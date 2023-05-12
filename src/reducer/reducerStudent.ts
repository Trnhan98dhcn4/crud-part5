import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import studentFake from "../api/student";
import { IStudent, IStudentSate } from "../model";
import { LOCAL_STORAGE } from "../constant/student.constant";
import { RootState } from "../app/store";

const initialState: IStudentSate = {
  students: studentFake,
  searchItem: "",
  currentPage: 1,
  pageSize: 5,
};

const student = createSlice({
  name: "student",
  initialState,
  reducers: {
    createStudent: (state, action: PayloadAction<IStudent>) => {
      state.students.push(action.payload);
      // save local storage student
      localStorage.setItem(LOCAL_STORAGE.user, JSON.stringify(state.students));
    },
    updateStudent: (state, action: PayloadAction<IStudent>) => {
      const student_ = action.payload;
      const index = state.students.findIndex((f) => f.id === student_.id);
      state.students[index] = student_;
      // save local storage  student
      localStorage.setItem(LOCAL_STORAGE.user, JSON.stringify(state.students));
    },
    deleteStudent: (state, action: PayloadAction<IStudent>) => {
      const student_ = action.payload;
      const index = state.students.findIndex((f) => f.id === student_.id);
      if (index !== -1) {
        state.students.splice(index, 1);
      }
      // save local storage  student
      localStorage.setItem(LOCAL_STORAGE.user, JSON.stringify(state.students));
    },
    searchItem: (state, action) => {
      state.searchItem = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setStudentSortAgeUp: (state) => {
      state.students.sort((a, b) => a.age.localeCompare(b.age));
    },
    setStudentSortAgeDown: (state) => {
      state.students.sort((a, b) => b.age.localeCompare(a.age));
    },
  },
});

const { reducer, actions } = student;
export const {
  createStudent,
  updateStudent,
  deleteStudent,
  searchItem,
  setCurrentPage,
  setPageSize,
  setStudentSortAgeUp,
  setStudentSortAgeDown,
} = actions;

export const selectStudents = (state: RootState) => {
  const { students, searchItem } = state.student;
  if (!searchItem) {
    return students;
  }
  return students.filter((student) =>
    student.name.toLowerCase().includes(searchItem.toLowerCase())
  );
};

export const currentStudentPage = (state: RootState) => {
  return state.student.currentPage;
};

export const pageStudentPage = (state: RootState) => {
  return state.student.pageSize;
};

export default reducer;
