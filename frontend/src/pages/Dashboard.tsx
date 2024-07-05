import React from 'react';
import NavigationBar from '../components/Navbar';
import Dashboard from '../components/Dashboard';

import { Container } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <Container>
        <Dashboard />
      </Container>
    </div>
  );
}

export default Home;
