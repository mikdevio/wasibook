import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container, ButtonGroup, Card } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputGroup from "./InputGroup";
import { userLoginForm, userLoginSchema } from "../schemas/user";
import { userLogin } from "../services/auth";
import DismissibleAlert from "./common/Alert";
import { useAuth } from "./common/AuthContext";

const LoginForm: React.FC = () => {
  const methods = useForm<userLoginForm>({
    resolver: zodResolver(userLoginSchema),
  });

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>(location.state?.message || "");

  const onSubmit = async (data: userLoginForm) => {
    try {
      const response = await userLogin(data.email, data.password, setUser);
      if (response) {
        setMessage("Login successfull");
        setIsLogin(true);

        if (response.role === "customer") {
          navigate("/clientboard");
        } else {
          navigate("/adminboard/mainboard");
        }
      } else {
        setMessage("Error while loging.");
        setIsLogin(false);
      }
    } catch (error) {
      setIsLogin(false);
      setMessage(`Server error while loging: ${error}`);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 min-vw-100 bg-dark">
      <Card
        className="border rounded p-4 text-white bg-dark"
        style={{ width: "500px" }}
      >
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <h4 className="align-item-">Login</h4>
            <DismissibleAlert message={message} />
            {/* {message && <Alert variant="info">{message}</Alert>} */}
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
            <div className="d-flex mt-4 justify-content-between align-items-center">
              <a href="#" className="text-white text-decoration-none">
                ¿Olvidaste tu contraseña?
              </a>
              <a href="/signup" className="text-white text-decoration-none">
                Crea cuenta nueva
              </a>
            </div>
          </Form>
        </FormProvider>
      </Card>
    </Container>
  );
};

export default LoginForm;
