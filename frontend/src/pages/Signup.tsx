import React from "react";
import SignupForm from "../components/SignupForm";

import { Container } from "react-bootstrap";

const Login: React.FC = () => {
  return (
    <>
      <Container className="m-0 p-0">
        <SignupForm />
      </Container>
    </>
  );
};

export default Login;
