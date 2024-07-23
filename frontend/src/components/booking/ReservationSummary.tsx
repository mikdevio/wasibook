import React from 'react';
import PriceSummary from './PriceSummary';
import { Card, Col, Container, Row } from 'react-bootstrap';

interface ReservationSummaryProps {}

const ReservationSummary: React.FC<ReservationSummaryProps> = () => {
  return (

    <Card>
      <Card.Body>
        <Card.Title>Reservation Summary</Card.Title>
        <Container className='mt-3'>
          <Row className='justify-content-between'>
            <Col className='m-0 p-0'>
              <Container className='border-bottom'>
                <Row><Card.Text className='p-0 fw-bold'>Check-in:</Card.Text></Row>
                <Row>Sun, 22 May 2022</Row>
                <Row>from 16:00</Row>
              </Container>
            </Col>
            <Col>
              <Container className='border-bottom'>
                <Row><Card.Text className='p-0 fw-bold'>Check-out:</Card.Text></Row>
                <Row>Wed, 25 May 2022</Row>
                <Row>by 11:00</Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Container className='mt-3 mb-2'>
              <Row>
                <Card.Text className='p-0 fw-bold'>Total Length of Stay:</Card.Text>
              </Row>
              <Row>
                3 days
              </Row>
            </Container>
          </Row>
          <Row>
            <Container className="mt-2 mb-4">
              <Row><Card.Text className='p-0 fw-bold'>You selected:</Card.Text></Row>
              <Row>King bed stylish Apartment with Loft style family room</Row>
              <Row><Card.Link className='p-0'>Change your selection</Card.Link></Row>
            </Container>
          </Row>
        </Container>
        <PriceSummary/>
      </Card.Body>
    </Card>
  );
}

export default ReservationSummary;
