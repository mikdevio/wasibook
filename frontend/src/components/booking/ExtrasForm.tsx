import React from "react";
import {
  Accordion,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";

import icon from "../../assets/placeholder.svg";
import { BookingData, ReservationData } from "../../types/Types";
import "./ExtrasForm.css";

interface BookingFormProps {
  bookingData: BookingData;
}

const ExtrasForm: React.FC<BookingFormProps> = (props: BookingFormProps) => {
  const { bookingData } = props;
  return (
    <div className="card shadow">
      <div className="card-body">
        {bookingData.reservationList.map((reserv) => (
          <ReservationCard imgURL={icon} reservationData={reserv} />
        ))}
        <DisclaimerArea />
        <DetailsForm />
        <ExtrasArea />
        <ButtonsArea />
      </div>
    </div>
  );
};

interface ReservationCardProps {
  imgURL: string;
  reservationData: ReservationData;
}

const ReservationCard: React.FC<ReservationCardProps> = (
  props: ReservationCardProps
) => {
  const { imgURL, reservationData } = props;

  return (
    <Card className="mt-2 round">
      <Row>
        <Col className="col-2">
          <Card.Img
            variant="right"
            src={imgURL}
            className="rounded-start"
            width={150}
            height={150}
          />
        </Col>
        <Col className="col">
          <CardBody>
            <h5 className="card-title">{`${reservationData.roomData.roomCode} ${reservationData.roomData.description}`}</h5>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
};

interface DisclaimerAreaProps {}

const DisclaimerArea: React.FC<DisclaimerAreaProps> = () => {
  return (
    <Container className="mt-4 mb-4 p-0">
      <Accordion defaultActiveKey={"0"} flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h5>Good to know:</h5>
          </Accordion.Header>
          <Accordion.Body className="px-2">
            <p className="justified-text">
              {" "}
              <strong>Free cancelation until 11:59 in May 2022.</strong> We
              understand that plans can change, and we strive to accommodate our
              guests' needs whenever possible. However, to ensure that we can
              provide the best service to all our guests, we have established a
              cancellation policy. If you need to cancel your reservation,
              please do so at least <strong>24 hours</strong> prior to your
              scheduled arrival date. Cancellations made within this window will
              incur no additional charges. However, cancellations made less than{" "}
              <strong>24 hours</strong> before the arrival date will result in a
              charge equivalent to one night's stay. This policy helps us manage
              our rooms effectively and ensures availability for other guests.
            </p>

            <p className="justified-text">
              In the event of a no-show, the full cost of the reservation will
              be charged to the credit card on file. We regret any inconvenience
              this may cause and appreciate your understanding. Special
              considerations may be made in cases of emergencies or unforeseen
              circumstances, but these will be addressed on a case-by-case
              basis. For group bookings or special events, please refer to the
              specific terms and conditions provided at the time of booking, as
              these may differ. If you have any questions or need assistance
              with your reservation, please do not hesitate to contact our front
              desk. We are here to help and ensure your stay with us is as
              pleasant as possible.
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

interface DetailsFormProps {}

const DetailsForm: React.FC<DetailsFormProps> = () => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title className="pb-2">Enter your details</Card.Title>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="firstname"
                placeholder="Enter your first name"
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="lastname"
                placeholder="Enter your last name"
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="phone"
                placeholder="Enter your phone number"
              ></Form.Control>
            </Form.Group>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

interface ExtrasAreaProps {}

const ExtrasArea: React.FC<ExtrasAreaProps> = () => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Extras</Card.Title>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Parking</Accordion.Header>
            <Accordion.Body>Details</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Beberagues</Accordion.Header>
            <Accordion.Body>Details</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Stay of pets</Accordion.Header>
            <Accordion.Body>Details</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Others</Accordion.Header>
            <Accordion.Body>Details</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

interface ButtonsAreaProps {}

const ButtonsArea: React.FC<ButtonsAreaProps> = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Button variant="danger" className="w-100">
            Return
          </Button>
        </Col>
        <Col>
          <Button variant="primary" className="w-100">
            Confirm
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ExtrasForm;
