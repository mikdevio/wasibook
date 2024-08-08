import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import StepMenu from "./StepMenu";
import ExtrasForm from "./ExtrasForm";
import PaymentForm from "./PaymentForm";
import NavigationBar from "../common/Navbar";
import ConfirmationForm from "./ConfirmationForm";
import RoomSelectionForm from "./RoomSelectionForm";
import ReservationSummary from "./ReservationSummary";
import { BookingData, RoomData, StepData, UserData } from "../../types/Types";

interface CustomerBoardProps {
  user: UserData;
  rooms: RoomData[];
  bookingData?: BookingData | undefined;
  steps: StepData[];
}

const CustomerBoard: React.FC<CustomerBoardProps> = (
  props: CustomerBoardProps
) => {
  const { user, rooms, bookingData, steps } = props;
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const renderStepComponent = () => {
    switch (selectedStep) {
      case 1:
        return <RoomSelectionForm roomList={rooms} />;
      case 2:
        return (
          <ExtrasForm bookingData={bookingData ? bookingData : undefined} />
        );
      case 3:
        return <PaymentForm />;
      case 4:
        return <ConfirmationForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <NavigationBar userName={user.email} />
      <Container className="mt-4">
        <StepMenu
          stepList={steps}
          onStepSelect={setSelectedStep}
          currentStep={selectedStep}
        />
        <Row className="row">
          <Col className="col-md-8">{renderStepComponent()}</Col>
          <Col className="col-md-4">
            <ReservationSummary />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CustomerBoard;
