import React from "react";
import LoginForm from "../components/LoginForm";

import { Container } from "react-bootstrap";

const Login: React.FC = () => {
  return (
    <>
      <Container className="m-0 p-0">
        <LoginForm />
      </Container>
    </>
  );
};

export default Login;
