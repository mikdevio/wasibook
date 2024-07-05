import React from 'react';
import NavigationBar from '../components/Navbar';

import { Container } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <Container>
        <h1>Home Page</h1>
      </Container>
    </div>
  );
}

export default Home;
