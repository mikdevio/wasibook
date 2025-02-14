import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import StepMenu from "./reserve/StepMenu";
import ExtrasForm from "./reserve/ExtrasForm";
import PaymentForm from "./reserve/PaymentForm";
import ConfirmationForm from "./reserve/ConfirmationForm";
import RoomSelectionForm from "./reserve/RoomSelectionForm";
import ReservationSummary from "./reserve/ReservationSummary";

import { RoomData, StepData, StepState } from "../../types/Types";
import { useReservation } from "./BookingContext";
import { useAuth } from "../common/AuthContext";
import { roomGetAll } from "../../services/hadlerData";

const stepsList: StepData[] = [
  {
    stepNumber: 1,
    stepLabel: "Fechas & Habitaciones",
    stepState: StepState.IN_PROCESS,
  },
  { stepNumber: 2, stepLabel: "Extras", stepState: StepState.INCOMPLETED },
  { stepNumber: 3, stepLabel: "Pago", stepState: StepState.INCOMPLETED },
  {
    stepNumber: 4,
    stepLabel: "Confirmación",
    stepState: StepState.INCOMPLETED,
  },
];

const CustomerReservarionBoard: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [steps, setSteps] = useState<StepData[]>(stepsList);
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const { bookingData } = useReservation();
  const { user } = useAuth();

  const handleNextStep = () => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => {
        if (step.stepNumber == selectedStep) {
          return { ...step, stepState: StepState.COMPLETED };
        } else if (step.stepNumber === selectedStep + 1) {
          return { ...step, stepState: StepState.IN_PROCESS };
        } else {
          return step;
        }
      })
    );
    setSelectedStep((prevStep) => prevStep + 1);
  };

  // TODO: Cambiar el renderizado de secciones a Layout&Router
  const renderStepComponent = () => {
    switch (selectedStep) {
      case 1:
        return <RoomSelectionForm roomList={rooms} onNext={handleNextStep} />;
      case 2:
        return (
          <ExtrasForm
            user={user}
            bookingData={bookingData ? bookingData : undefined}
            onNext={handleNextStep}
          />
        );
      case 3:
        return <PaymentForm onNext={handleNextStep} />;
      case 4:
        return <ConfirmationForm />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsData = await roomGetAll();
      setRooms(roomsData);
    };

    fetchRooms();
  }, []);

  return (
    <>
      <Row className="mt-4">
        <StepMenu
          stepList={steps}
          onStepSelect={setSelectedStep}
          currentStep={selectedStep}
        />
      </Row>
      <Row>
        <Col className="col-md-9 ">{renderStepComponent()}</Col>
        <Col className="col-md-3">
          <ReservationSummary />
        </Col>
      </Row>
    </>
  );
};

export default CustomerReservarionBoard;
