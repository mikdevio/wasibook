import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import NavigationBar from "../components/common/Navbar";
import StepMenu from "../components/booking/StepMenu";
import ExtrasForm from "../components/booking/ExtrasForm";
import RoomSelectionForm from "../components/booking/RoomSelectionForm";
import PaymentForm from "../components/booking/PaymentForm";
import ConfirmationForm from "../components/booking/ConfirmationForm";
import ReservationSummary from "../components/booking/ReservationSummary";

import {
  BookingData,
  PricesDictionary,
  CheckData,
  RoomData,
  ReservationData,
  StepState,
} from "./../types/Types";

const checkIn: CheckData = {
  checkType: "in",
  date: new Date("2022-05-22T16:00:00"),
};

const checkOut: CheckData = {
  checkType: "in",
  date: new Date("2022-05-25T11:00:00"),
};

const roomOne: RoomData = {
  image: "url/img/1.jpeg",
  roomCode: "A001",
  stars: 4,
  room: "Singler",
  price: 12.5,
  description: "King bed stylish Apartment with Loft style family room",
};

const roomTwo: RoomData = {
  image: "url/img/2.jpeg",
  roomCode: "A002",
  stars: 3,
  room: "Duplex",
  price: 25.5,
  description: "King bed stylish Apartment with Loft style family room",
};

const Prices: PricesDictionary = {
  id_1: {
    tag: "Rooms and offer:",
    value: 625.43,
  },
  id_2: {
    tag: "8% VAT:",
    value: 50.03,
  },
  id_3: {
    tag: "City tax:",
    value: 16.44,
  },
  id_4: {
    tag: "Total Price:",
    value: 698.87,
  },
};

const reservationOne: ReservationData = {
  checkinData: checkIn,
  checkoutData: checkOut,
  roomData: roomOne,
};

const reservationTwo: ReservationData = {
  checkinData: checkIn,
  checkoutData: checkOut,
  roomData: roomTwo,
};

const BookingExample: BookingData = {
  reservationList: [reservationOne, reservationTwo],
  pricesDictionary: Prices,
};

const steps = [
  { stepNumber: 1, stepLabel: "Dates & Rooms", stepState: StepState.Completed },
  { stepNumber: 2, stepLabel: "Extras", stepState: StepState.InProcess },
  { stepNumber: 3, stepLabel: "Payment", stepState: StepState.Incompleted },
  {
    stepNumber: 4,
    stepLabel: "Confirmation",
    stepState: StepState.Incompleted,
  },
];

const rooms = [
  {
    image: "url/img/1.jpeg",
    roomCode: "A001",
    stars: 4,
    room: "Singler",
    description: "Des1",
    price: 12.5,
  },
  {
    image: "url/img/2.jpeg",
    roomCode: "A002",
    stars: 3,
    room: "Duplex",
    description: "Des2",
    price: 25.5,
  },
  {
    image: "url/img/3.jpeg",
    roomCode: "A003",
    stars: 4,
    room: "Duplex King",
    description: "Des3",
    price: 50.6,
  },
  {
    image: "url/img/3.jpeg",
    roomCode: "A003",
    stars: 4,
    room: "Duplex King",
    description: "Des3",
    price: 50.6,
  },
  {
    image: "url/img/3.jpeg",
    roomCode: "A003",
    stars: 4,
    room: "Duplex King",
    description: "Des3",
    price: 50.6,
  },
  {
    image: "url/img/3.jpeg",
    roomCode: "A003",
    stars: 4,
    room: "Duplex King",
    description: "Des3",
    price: 50.6,
  },
  {
    image: "url/img/3.jpeg",
    roomCode: "A003",
    stars: 4,
    room: "Duplex King",
    description: "Des3",
    price: 50.6,
  },
  {
    image: "url/img/3.jpeg",
    roomCode: "A003",
    stars: 4,
    room: "Duplex King",
    description: "Des3",
    price: 50.6,
  },
  {
    image: "url/img/3.jpeg",
    roomCode: "A003",
    stars: 4,
    room: "Duplex King",
    description: "Des3",
    price: 50.6,
  },
];

const Dashboard: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const renderStepComponent = () => {
    switch (selectedStep) {
      case 1:
        return <RoomSelectionForm roomList={rooms} />;
      case 2:
        return <ExtrasForm bookingData={BookingExample} />;
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
      <NavigationBar />
      <Container className="mt-4">
        <StepMenu
          stepList={steps}
          onStepSelect={setSelectedStep}
          currentStep={selectedStep}
        />
        <Row className="row">
          <Col className="col-md-8">{renderStepComponent()}</Col>
          <Col className="col-md-4">
            <ReservationSummary bookingData={BookingExample} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
