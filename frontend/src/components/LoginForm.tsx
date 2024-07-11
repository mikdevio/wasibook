import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, ButtonGroup } from 'react-bootstrap';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Login successful');
        navigate("/dashboard")
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 min-vw-100 bg-dark">
      <div className='w-25 border rounded shadow-sm overflow-hidden p-4 text-white'>
        <Form onSubmit={handleLogin}>
          <h4 className="align-item-">Login</h4>
          {message && <Alert variant="info">{message}</Alert>}
          <Form.Group className="pt-2" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="pt-2" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
              required 
            />
          </Form.Group>
          <ButtonGroup className="w-100 pt-4">
            <Button variant="primary" type="submit">Login</Button>
            <Button variant="danger" type="button" href='/'>Home</Button>
          </ButtonGroup>
        </Form>
      </div>
    </Container>
  );
}

export default LoginForm;
