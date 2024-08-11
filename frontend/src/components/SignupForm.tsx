import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  Button,
  Container,
  ButtonGroup,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { userSignupSchema, userSignupForm } from "../schemas/user";
import InputGroup from "./InputGroup";
import { userSignup } from "../services/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm: React.FC = () => {
  const methods = useForm<userSignupForm>({
    resolver: zodResolver(userSignupSchema),
  });

  const [isSignup, setIsSignup] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (data: userSignupForm) => {
    try {
      const response = await userSignup(
        data.firstName,
        data.lastName,
        data.email,
        data.password
      );

      if (response) {
        setMessage("Signup successfully. Please, login now.");
        setIsSignup(true);
        navigate("/login", {
          state: { message: "Signup successfully." },
        });
      } else {
        setMessage("Error while signing up");
        setIsSignup(false);
      }
    } catch (error) {
      setMessage("Server error while signing up");
      setIsSignup(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 min-vw-100 bg-dark">
      <Card
        className="border rounded overflow-hidden p-4 bg-dark text-white"
        style={{ width: "500px" }}
      >
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            {message && <Alert variant="info">{message}</Alert>}
            <Row>
              <Col>
                <h4>Crear cuenta nueva</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup
                  id="firstName"
                  type="text"
                  toRegister={true}
                  placeholder="Miguel"
                >
                  Nombre
                </InputGroup>
              </Col>
              <Col>
                <InputGroup
                  id="lastName"
                  type="text"
                  toRegister={true}
                  placeholder="Lopéz"
                >
                  Apellido
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup
                  id="email"
                  type="email"
                  toRegister={true}
                  placeholder="miguel.lopez@email.com"
                >
                  Email
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup
                  id="password"
                  type="password"
                  toRegister={true}
                  placeholder="Contraseña de 8 carácteres"
                >
                  Contraseña
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <ButtonGroup className="w-100 pt-4">
                <Button variant="warning" type="submit">
                  Crear cuenta
                </Button>
                <Button variant="danger" type="button" href="/">
                  Home
                </Button>
              </ButtonGroup>
            </Row>
            <Row className="mt-4">
              <a href="/login" className="text-white text-decoration-none">
                ¿Tienes una cuenta?
              </a>
            </Row>
          </Form>
        </FormProvider>
      </Card>
    </Container>
  );
};

export default SignupForm;
