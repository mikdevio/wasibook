import { Check } from "react-bootstrap-icons";
import { Container, Card, Col, Row } from "react-bootstrap";
import { StepData, StepState } from "../../types/Types";

interface StepMenuProps {
  stepList: StepData[];
  onStepSelect: (step: number) => void;
  currentStep: number;
}

const StepMenu: React.FC<StepMenuProps> = ({
  stepList,
  onStepSelect,
  currentStep,
}) => {
  return (
    <Container className="mb-4 text-center">
      <Row className="justify-content-center align-items-center">
        {stepList.map((step) => (
          <StepBox
            stepNumber={step.stepNumber}
            stepLabel={step.stepLabel}
            stepState={step.stepState}
            onStepSelect={onStepSelect}
            isSelected={currentStep === step.stepNumber}
          />
        ))}
      </Row>
    </Container>
  );
};

interface StepBoxProps {
  stepNumber: number;
  stepLabel: string;
  stepState: StepState;
  onStepSelect: (step: number) => void;
  isSelected: boolean;
}

const StepStyle = {
  [StepState.Incompleted]: {
    background: "#f0f0f0",
    number_color: "#aba9a9",
    label_color: "#aba9a9",
  },
  [StepState.InProcess]: {
    background: "#0d6efd",
    number_color: "#fff",
    label_color: "#0d6efd",
  },
  [StepState.Completed]: {
    background: "#6bff72",
    number_color: "#fff",
    label_color: "#009107",
  },
};

const StepBox: React.FC<StepBoxProps> = (props) => {
  const { stepNumber, stepLabel, stepState, onStepSelect, isSelected } = props;
  const currentStyle = StepStyle[stepState];

  return (
    <Col className="d-flex justify-content-center align-items-center">
      <Card
        className="rounded shadow d-flex justify-content-center align-items-center"
        style={{
          width: "40px",
          height: "40px",
          background: currentStyle.background,
          color: currentStyle.number_color,
          cursor: "pointer",
        }}
        onClick={() => onStepSelect(stepNumber)}
      >
        {stepState === StepState.Completed ? (
          <Check size={32} className="icon" />
        ) : (
          stepNumber
        )}
      </Card>
      <span className="mx-2" style={{ color: currentStyle.label_color }}>
        {" "}
        {stepLabel}{" "}
      </span>
    </Col>
  );
};

export default StepMenu;
