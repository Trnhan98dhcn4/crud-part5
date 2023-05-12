import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./styles.css";
import { IStudent } from "../../model";
import { useAppDispatch } from "../../app/hooks";
import { searchItem } from "../../reducer/reducerStudent";

function Header(props: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { show, setShow, setIsUpdate } = props;
  const { register, handleSubmit, reset } = useForm<IStudent>({
    defaultValues: {
      search: "",
    },
  });

  // redux toolkit
  const dispatch = useAppDispatch();

  // logic create
  const handleCreate = (isCreate: boolean) => {
    setShow(!show);
    setIsUpdate(isCreate);
  };
  //logic search
  const onSubmitSearch = (item: IStudent) => {
    dispatch(searchItem(item.search));
    reset();
  };

  return (
    <header className="header">
      <Form className="form-search" onSubmit={handleSubmit(onSubmitSearch)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter search..."
            {...register("search")}
          />
        </Form.Group>
        <Button className="btn-search" type="submit">
          search
        </Button>
      </Form>
      <h2>Crud Student Details</h2>
      <Button
        variant="primary"
        onClick={() => handleCreate(false)}
        type="button"
      >
        Add New Student
      </Button>
    </header>
  );
}

export default Header;
