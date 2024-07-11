import React from 'react';
import NavigationBar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import { Container } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <Container fluid className='m-0 p-0'>
        <Sidebar />
        
      </Container>
    </div>
  );
}

export default Home;
