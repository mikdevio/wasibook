import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import PriceSummary from "./PriceSummary";
import { BookingData, RoomReservedData } from "../../types/Types";

interface CheckBlockProps {
  check: string;
}

const CheckBlock: React.FC<CheckBlockProps> = (props: CheckBlockProps) => {
  const { check } = props;
  const [dateTime, setDateTime] = useState<Date>(new Date());

  const handleDateChange = (date: any) => {
    setDateTime(date);
  };

  return (
    <Container className="p-0">
      <Row>
        <Col>
          <Card.Text className="p-0 fw-bold">Check-{check}:</Card.Text>
        </Col>
      </Row>
      <Row>
        <Col>
          <Datetime value={dateTime} onChange={handleDateChange} />
        </Col>
      </Row>
    </Container>
  );
};

interface StayLabelProps {
  days: string;
}

const StayLabel: React.FC<StayLabelProps> = (props: StayLabelProps) => {
  const { days } = props;
  return (
    <Container className="mt-2 mb-2">
      <Row>
        <Card.Text className="p-0 fw-bold">Total Length of Stay:</Card.Text>
      </Row>
      <Row>{days}</Row>
    </Container>
  );
};

interface RoomSelectedLabelProps {
  code: string;
  description: string;
}

const RoomSelectedLabel: React.FC<RoomSelectedLabelProps> = (
  props: RoomSelectedLabelProps
) => {
  const { code, description } = props;
  return (
    <Container className="mt-2 mb-2">
      <Row>
        <Card.Text className="p-0 fw-bold">You selected:</Card.Text>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        <Col className="col-2">{code}</Col>
        <Col>{description}</Col>
      </Row>
      <Row className="d-flex justify-content-center mt-2">
        <Col className="text-center">
          <Card.Link>Change</Card.Link>
        </Col>
        <Col className="text-center">
          <Card.Link className="text-danger">Delete</Card.Link>
        </Col>
      </Row>
    </Container>
  );
};

interface RoomReservationCardProps {
  id: number;
  reservation: RoomReservedData;
}

const RoomReservationCard: React.FC<RoomReservationCardProps> = (
  props: RoomReservationCardProps
) => {
  const { id, reservation } = props;

  const getStayLength = (dateIn: Date, dateOut: Date) => {
    return dateOut.getDay() - dateIn.getDay();
  };

  return (
    <Container key={id} className="mt-3 border-bottom">
      <Row className="justify-content-between">
        <Col className="m-0 p-0">
          <CheckBlock check="in" />
        </Col>
        <Col>
          <CheckBlock check="out" />
        </Col>
      </Row>
      <Row>
        <StayLabel
          days={`${getStayLength(
            reservation.checkinData.date,
            reservation.checkoutData.date
          )} days`}
        />
      </Row>
      <Row>
        <RoomSelectedLabel
          code={reservation.roomData.code}
          description={reservation.roomData.description}
        />
      </Row>
    </Container>
  );
};

interface ReservationSummaryProps {
  bookingData?: BookingData;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = (
  props: ReservationSummaryProps
) => {
  const { bookingData } = props;

  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title>Reservation Summary</Card.Title>
        {bookingData ? (
          bookingData.reservationList.map((r, id) => (
            <RoomReservationCard id={id} reservation={r} />
          ))
        ) : (
          <span className="mt-5 text-secondary text-center fs-5">
            No hay habitaciones reservadas
          </span>
        )}
        <PriceSummary
          prices_dict={bookingData ? bookingData.pricesDictionary : undefined}
        />
      </Card.Body>
    </Card>
  );
};

export default ReservationSummary;
