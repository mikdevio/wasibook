import { Check } from 'react-bootstrap-icons';
import { Container, Card, Col, Row } from 'react-bootstrap';
import './StepMenu.css'
import { StepState } from '../../types/Types';

interface StepMenuProps {}

const StepMenu: React.FC<StepMenuProps> = () =>  {
  return (
    <Container className='mb-4 text-center'>
        <Row className='justify-content-center align-items-center'>
            <StepBox stepNumber={1} stepLabel='Dates & Rooms' stepState={StepState.Completed}/>
            <StepBox stepNumber={2} stepLabel='Extras' stepState={StepState.InProcess}/>
            <StepBox stepNumber={3} stepLabel='Payment' stepState={StepState.Incompleted}/>
            <StepBox stepNumber={4} stepLabel='Confirmation' stepState={StepState.Incompleted}/>
        </Row>
    </Container>
  );
}

interface StepBoxProps {
    stepNumber: number,
    stepLabel: string,
    stepState: StepState
}

const StepStyle = {
    [StepState.Incompleted] : {
        background: '#f0f0f0',
        number_color: '#aba9a9',
        label_color: "#aba9a9"
    },
    [StepState.InProcess] : {
        background: '#0d6efd',
        number_color: '#fff',
        label_color: "#0d6efd"
    },
    [StepState.Completed] : {
        background: '#6bff72',
        number_color: '#fff',
        label_color: "#009107"
    },
}

const StepBox: React.FC<StepBoxProps> = (props) => {
    const { stepNumber, stepLabel, stepState } = props;
    const currentStyle = StepStyle[stepState];

    return (
        <Col className='d-flex justify-content-center align-items-center'>
            <Card className='rounded shadow d-flex justify-content-center align-items-center' style={{
                width: '40px', 
                height: '40px', 
                background: currentStyle.background, 
                color: currentStyle.number_color
                }}>
                {stepState === StepState.Completed ? <Check size={32} className='icon' /> : stepNumber}
            </Card>
            <span className='mx-2' style={{color: currentStyle.label_color}}> {stepLabel} </span>
        </Col>
    );
}

export default StepMenu;