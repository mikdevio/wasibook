import { Check } from 'react-bootstrap-icons';
import { Container, Card, Col, Row } from 'react-bootstrap';
import './StepMenu.css'

interface StepMenuProps {}

const StepMenu: React.FC<StepMenuProps> = () =>  {
  return (
    <Container className='mb-4 text-center'>
        <Row className='justify-content-center align-items-center'>
            <Col className='d-flex justify-content-center align-items-center'>
                <Card className='rounded shadow d-flex justify-content-center align-items-center' style={{width: '40px', height: '40px', backgroundColor: '#0ac228', color: 'white' }}>
                <Check size={32} className='icon'/>
                </Card>
                <span className='mx-2 text-success'>Dates & Rooms</span>
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
  );
}

export default StepMenu;