import { Table, Button, Pagination } from "react-bootstrap";
import { useState } from "react";

import Header from "../Header/Header";
import DialogForm from "../DialogForm/DialogForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IStudent } from "../../model";
import {
  currentStudentPage,
  deleteStudent,
  pageStudentPage,
  selectStudents,
  setCurrentPage,
  setStudentSortAgeDown,
  setStudentSortAgeUp,
} from "../../reducer/reducerStudent";

import "./styles.css";

function TableForm() {
  // dialog
  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [itemEdit, setItemEdit] = useState({} as IStudent);

  //redux toolkit
  const studentSearch = useAppSelector(selectStudents);
  //const student = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();

  // logic update
  const handleUpdate = (isEdit: boolean, student: IStudent) => {
    setShow(!show);
    setIsUpdate(isEdit);
    setItemEdit(student);
  };

  // logic Delete
  const handleDelete = (item: IStudent) => {
    dispatch(deleteStudent(item));
  };

  //Pagination
  const currentPages = useAppSelector(currentStudentPage);
  const pagesSize = useAppSelector(pageStudentPage);
  const start = (currentPages - 1) * pagesSize;
  const end = start + pagesSize;
  const visibleStudents = studentSearch.slice(start, end);

  const pageCount = Math.ceil(studentSearch.length / pagesSize);

  const handlePageChange = (PageNumber: number) => {
    dispatch(setCurrentPage(PageNumber));
  };

  //sort age
  const [ischecked, setIsChecked] = useState(false);
  const handeSortAge = () => {
    setIsChecked(!ischecked);
    ischecked === true
      ? dispatch(setStudentSortAgeUp())
      : dispatch(setStudentSortAgeDown());
  };

  return (
    <div className="table-form">
      <Header
        show={show}
        setShow={setShow}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
      />
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#Id</th>
            <th>Name</th>
            <th>Gender</th>
            <th>
              Age <Button onClick={() => handeSortAge()}>sort</Button>
            </th>
            <th>Address</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visibleStudents.map((item: IStudent, index: any) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.gender}</td>
                <td>{item.age}</td>
                <td>{item.address}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleUpdate(true, item)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(item)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(pageCount)].map((_, i) => (
          <Pagination.Item
            key={i}
            active={i + 1 === currentPages}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      <DialogForm
        show={show}
        setShow={setShow}
        isUpdate={isUpdate}
        itemEdit={itemEdit}
      />
    </div>
  );
}

export default TableForm;
