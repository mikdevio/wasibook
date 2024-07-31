import { ReactNode } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";

interface InputProps {
  id: string;
  type: string;
  children: ReactNode;
  toRegister?: boolean;
  placeholder?: string;
}

const InputGroup: React.FC<InputProps> = (props: InputProps) => {
  const { id, type, children, placeholder, toRegister = false } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[id] as FieldError;

  return (
    <Form.Group className="pt-2" controlId={id}>
      <Form.Label>{children}</Form.Label>
      <Form.Control
        {...(toRegister ? register(id) : {})}
        type={type}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-danger">{error.message}</p>}
    </Form.Group>
  );
};

export default InputGroup;
