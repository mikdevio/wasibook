import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container, ButtonGroup } from "react-bootstrap";
import InputGroup from "./InputGroup";
import { FormProvider, useForm } from "react-hook-form";
import { userLoginForm, userLoginSchema } from "../schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin } from "../services/auth";

const LoginForm: React.FC = () => {
  const methods = useForm<userLoginForm>({
    resolver: zodResolver(userLoginSchema),
  });

  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (data: userLoginForm) => {
    try {
      const response = await userLogin(data.email, data.password);
      if (response) {
        setMessage("Login successfull");
        setIsLogin(true);
        navigate("/dashboard");
      } else {
        setMessage("Error while loging.");
        setIsLogin(false);
      }
    } catch (error) {
      setIsLogin(false);
      setMessage("Server error while loging.");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 min-vw-100 bg-dark">
      <div
        className="border rounded p-4 text-white bg-dark"
        style={{ width: "500px" }}
      >
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <h4 className="align-item-">Login</h4>
            {message && <Alert variant="info">{message}</Alert>}
            <InputGroup
              id="email"
              type="email"
              placeholder="Logging email"
              toRegister={true}
            >
              Email
            </InputGroup>
            <InputGroup
              id="password"
              type="password"
              toRegister={true}
              placeholder="Password"
            >
              Password
            </InputGroup>
            <ButtonGroup className="w-100 pt-4">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Button variant="danger" type="button" href="/">
                Home
              </Button>
            </ButtonGroup>
          </Form>
        </FormProvider>
      </div>
    </Container>
  );
};

export default LoginForm;
