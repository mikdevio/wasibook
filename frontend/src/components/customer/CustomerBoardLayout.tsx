import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import StepMenu from "./StepMenu";
import ExtrasForm from "./ExtrasForm";
import PaymentForm from "./PaymentForm";
import NavigationBar from "../common/Navbar";
import ConfirmationForm from "./ConfirmationForm";
import RoomSelectionForm from "./RoomSelectionForm";
import ReservationSummary from "./ReservationSummary";
import { CustomerSidebarDetails, RoomData, StepState } from "../../types/Types";
import { useReservation } from "../common/BookingContext";
import { useAuth } from "../common/AuthContext";
import { roomGetAll } from "../../services/hadlerData";
import Sidebar from "../common/Sidebar";

const CustomerBoardLayout: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const { bookingData } = useReservation();
  const { user } = useAuth();

  const steps = [
    {
      stepNumber: 1,
      stepLabel: "Dates & Rooms",
      stepState: StepState.IN_PROCESS,
    },
    { stepNumber: 2, stepLabel: "Extras", stepState: StepState.INCOMPLETED },
    { stepNumber: 3, stepLabel: "Payment", stepState: StepState.INCOMPLETED },
    {
      stepNumber: 4,
      stepLabel: "Confirmation",
      stepState: StepState.INCOMPLETED,
    },
  ];

  // TODO: Cambiar el renderizado de secciones a Layout&Router
  const renderStepComponent = () => {
    switch (selectedStep) {
      case 1:
        return <RoomSelectionForm roomList={rooms} />;
      case 2:
        return (
          <ExtrasForm
            user={user}
            bookingData={bookingData ? bookingData : undefined}
          />
        );
      case 3:
        return <PaymentForm />;
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
      <NavigationBar />
      <Container fluid className="ps-0">
        <Row>
          <Col className="col-2">
            <Sidebar details={CustomerSidebarDetails} />
          </Col>
          <Col>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CustomerBoardLayout;
