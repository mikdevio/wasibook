import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

interface PriceSummaryProps {}

const PriceSummary: React.FC<PriceSummaryProps> = () => {
  return (
    <Container className='p-0'>
      <Card.Title>Your Price Summary</Card.Title>
      <Row className='justify-content-between'>
        <Col>Rooms and offer:</Col>
        <Col className='text-end'>$625.43</Col>
      </Row>
      <Row lassName='justify-content-between'>
        <Col>8% VAT:</Col>
        <Col className='text-end'>$50.03</Col>
      </Row>
      <Row lassName='justify-content-between'>
        <Col>City tax:</Col>
        <Col className='text-end'>$16.44</Col>
      </Row>
      <Row lassName='justify-content-between'>
        <Col><Card.Text className='p-0 fw-bold'>Total Price:</Card.Text></Col>
        <Col className='text-end'><Card.Text className='p-0 fw-bold'>$698.87</Card.Text></Col>
      </Row>
      <Row className='mt-4'>
        <Button variant='primary' className=''>Request to book</Button>
      </Row>
    </Container>

  );
}

export default PriceSummary;
