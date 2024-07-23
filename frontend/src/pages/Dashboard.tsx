import React from 'react';
import NavigationBar from '../components/Navbar';
import { Check } from 'react-bootstrap-icons'

import { Card, Col, Container, Row } from 'react-bootstrap';
import BookingForm from '../components/booking/BookingForm';
import ReservationSummary from '../components/booking/ReservationSummary';
import '../components/booking/StepMenu.css'

const Home: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <Container className='mt-5'>
        <Container className='mb-4 text-center'>
          <Row className='justify-content-center align-items-center'>
            <Col className='d-flex justify-content-center align-items-center'>
              <Card className='rounded shadow d-flex justify-content-center align-items-center' style={{width: '40px', height: '40px', backgroundColor: '#0ac228', color: 'white' }}>
                <Check size={32} className='icon'/>
              </Card>
              <span className='mx-2 text-success'>Dates & Rooms</span>
              <span className="step-line"></span>
            </Col>
            <Col className='d-flex justify-content-center align-items-center'>
              <Card className='rounded shadow d-flex justify-content-center align-items-center bg-primary text-white' style={{width: '40px', height: '40px'}}>2</Card>
              <span className='mx-2 text-primary'>Extras</span>
            </Col>
            <Col className='d-flex justify-content-center align-items-center'>
              <Card className='rounded shadow d-flex justify-content-center align-items-center' style={{width: '40px', height: '40px'}}>3</Card>
              <span className='mx-2'>Payment</span>
            </Col>
            <Col className='d-flex justify-content-center align-items-center'>
              <Card className='rounded shadow d-flex justify-content-center align-items-center' style={{width: '40px', height: '40px'}}>4</Card>
              <span className='mx-2'>Confirmation</span>
            </Col>
          </Row>
        </Container>
        <div className="row">
          <div className="col-md-8">
            <BookingForm />
          </div>
          <div className="col-md-4">
            <ReservationSummary />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
