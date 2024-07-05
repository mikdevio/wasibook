import React from 'react';
import NavigationBar from '../components/Navbar';
import LoginForm from '../components/LoginForm';

import { Container } from 'react-bootstrap';

const Login: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <Container>
        <LoginForm />
      </Container>
    </div>
  );
}

export default Login;
