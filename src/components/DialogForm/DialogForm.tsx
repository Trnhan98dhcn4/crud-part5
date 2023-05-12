import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IStudent } from "../../model";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createStudent, updateStudent } from "../../reducer/reducerStudent";
import { useEffect } from "react";

function DialogForm(props: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdate: boolean;
  itemEdit: IStudent;
}) {
  const { show, setShow, isUpdate, itemEdit } = props;
  const { register, handleSubmit, reset, setValue } = useForm<IStudent>({
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      address: "",
      date: new Date(),
    },
  });

  // redux toolkit
  const student = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (itemEdit) {
      setValue("name", itemEdit.name);
      setValue("age", itemEdit.age);
      setValue("gender", itemEdit.gender);
      setValue("address", itemEdit.address);
      setValue("date", itemEdit.date);
    }
  }, [itemEdit, setValue]);

  // handClose
  const handClose = () => {
    setShow(false);
    reset();
  };

  // logic submit
  const toggle = () => setShow(false);
  const onSubmit = (item: IStudent) => {
    if (isUpdate === false) {
      item.id =
        student.students.length === 0
          ? 1
          : student.students[student.students.length - 1].id + 1;
      dispatch(createStudent(item));
      reset();
    } else {
      item.id = itemEdit.id;
      dispatch(updateStudent(item));
      //console.log("update");
    }
    toggle();
  };
  return (
    <Modal show={show} onHide={() => handClose()}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isUpdate === false ? "Create New Student" : "Update Student"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name..."
              {...register("name")}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Age:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter age..."
              {...register("age")}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Gender:</Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...register("gender")}
            >
              <option>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address..."
              {...register("address")}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter address..."
              {...register("date")}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handClose()}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default DialogForm;
