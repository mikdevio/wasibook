import React from 'react';
import NavigationBar from '../components/Navbar';
import Heroes from '../components/homepage/Heroes';
import Features from '../components/homepage/Features';
import Footer from '../components/Footer';
import Album from '../components/homepage/Album';

import { Container } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <div>
      <Container fluid className='p-0'>
        <NavigationBar />
        <Heroes />
        <Features />
        <Album />
        <Footer />
      </Container>
    </div>
  );
}

export default Home;
