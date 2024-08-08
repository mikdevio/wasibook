import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import PriceSummary from "./PriceSummary";
import { CheckData, RoomReservedData } from "../../types/Types";
import { useReservation } from "../common/BookingContext";

import "./CustomerBoard.css";
import { getStayLength } from "../../services/utils";
import moment from "moment";

interface CheckBlockProps {
  roomId: string;
  check: CheckData;
}

const CheckBlock: React.FC<CheckBlockProps> = (props: CheckBlockProps) => {
  const { roomId, check } = props;
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const { changeDateReservation } = useReservation();

  useEffect(() => {
    setDateTime(check.date);
  }, [check.date]);

  const handleDateChange = (date: any) => {
    const newDate = moment.isMoment(date) ? date.toDate() : date;
    setDateTime(newDate);
    changeDateReservation(roomId, check.type, newDate);
  };

  return (
    <Container className="p-0">
      <Row>
        <Col>
          <Card.Text className="p-0 fw-bold">Check-{check.type}:</Card.Text>
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
        <Col>
          <p className="text-truncate-multiline">{description}</p>
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
  const { removeReservation, updatePriceDictionary } = useReservation();

  const handleDelete = (roomId: string) => {
    removeReservation(roomId);
    updatePriceDictionary();
  };

  return (
    <Container key={id} className="mt-3 border-bottom">
      <Row className="justify-content-between">
        <Col className="m-0 p-0">
          <CheckBlock
            roomId={reservation.roomData._id}
            check={reservation.checkinData}
          />
        </Col>
        <Col>
          <CheckBlock
            roomId={reservation.roomData._id}
            check={reservation.checkoutData}
          />
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
      <Row className="d-flex justify-content-center mb-2">
        <Col className="text-center">
          <Card.Link style={{ cursor: "pointer" }}>Change</Card.Link>
        </Col>
        <Col className="text-center">
          <Card.Link
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(reservation.roomData._id)}
          >
            Delete
          </Card.Link>
        </Col>
      </Row>
    </Container>
  );
};

const ReservationSummary: React.FC = () => {
  const { bookingData } = useReservation();
  console.log(bookingData);

  return (
    <Card className="shadow">
      <Card.Header>
        <Card.Title>Reservation Summary</Card.Title>
      </Card.Header>
      <Card.Body>
        {bookingData.reservationList.length !== 0 ? (
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
