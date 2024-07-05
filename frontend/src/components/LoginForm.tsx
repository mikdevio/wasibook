import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

const LoginForm: React.FC = () => {
  const [email, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful');
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <Form onSubmit={handleLogin}>
    <h2>Login</h2>
    {message && <Alert variant="info">{message}</Alert>}
    <Form.Group controlId="formUsername">
      <Form.Label>Email</Form.Label>
      <Form.Control 
        type="text" 
        value={email} 
        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} 
        required 
      />
    </Form.Group>
    <Form.Group controlId="formPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control 
        type="password" 
        value={password} 
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
        required 
      />
    </Form.Group>
    <Button variant="primary" type="submit">Login</Button>
  </Form>
  );
}

export default LoginForm;
