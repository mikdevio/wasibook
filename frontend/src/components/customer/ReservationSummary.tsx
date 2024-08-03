import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import PriceSummary from "./PriceSummary";
import { BookingData } from "../../types/Types";

import { format } from "date-fns";

interface ReservationSummaryProps {
  bookingData: BookingData;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = (
  props: ReservationSummaryProps
) => {
  const { bookingData } = props;

  const formatDate = (date: Date) => {
    return format(date, "eee, MMM dd yyyy");
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getStayLength = (dateIn: Date, dateOut: Date) => {
    return dateOut.getDay() - dateIn.getDay();
  };

  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title>Reservation Summary</Card.Title>
        {bookingData.reservationList.map((reserv) => (
          <Container className="mt-3 border-bottom">
            <Row className="justify-content-between">
              <Col className="m-0 p-0">
                <CheckBlock
                  check="in"
                  date={formatDate(reserv.checkinData.date)}
                  time={formatTime(reserv.checkinData.date)}
                />
              </Col>
              <Col>
                <CheckBlock
                  check="out"
                  date={formatDate(reserv.checkoutData.date)}
                  time={formatTime(reserv.checkoutData.date)}
                />
              </Col>
            </Row>
            <Row>
              <StayLabel
                days={`${getStayLength(
                  reserv.checkinData.date,
                  reserv.checkoutData.date
                )} days`}
              />
            </Row>
            <Row>
              <RoomSelectedLabel
                code={reserv.roomData.roomCode}
                description={reserv.roomData.description}
              />
            </Row>
          </Container>
        ))}
        <PriceSummary prices_dict={bookingData.pricesDictionary} />
      </Card.Body>
    </Card>
  );
};

interface CheckBlockProps {
  check: string;
  date: string;
  time: string;
}

const CheckBlock: React.FC<CheckBlockProps> = (props: CheckBlockProps) => {
  const { check, date, time } = props;
  return (
    <Container>
      <Row>
        <Card.Text className="p-0 fw-bold">Check-{check}:</Card.Text>
      </Row>
      <Row>{date}</Row>
      <Row>{time}</Row>
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

export default ReservationSummary;
