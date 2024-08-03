import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

import { RoomData } from "../../types/Types";

interface RoomSelectionFormProps {
  roomList: RoomData[];
}

const RoomSelectionForm: React.FC<RoomSelectionFormProps> = (
  props: RoomSelectionFormProps
) => {
  const { roomList } = props;

  return (
    <>
      <Card className="shadow p-3 h-100">
        <Row className="justify-content-center">
          {roomList.map((room, index) => (
            <Col ke={index} md={4} className="d-flex align-items-stretch mb-4">
              <RoomCard {...room} />
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
};

interface RoomCardProps {
  image: string;
  stars: number;
  room: string;
  description: string;
  price: number;
}

const RoomCard: React.FC<RoomCardProps> = (props: RoomCardProps) => {
  const { image, room, stars, description, price } = props;

  const starsCount = Array.from({ length: stars });

  return (
    <Card className="mt-2" style={{ width: "100%", height: "250px" }}>
      <Card.Img
        variant="top"
        src={image}
        style={{ width: "100%", height: "40%" }}
      />
      <Card.Body as={Container} className="px-3">
        <Row>
          <Card.Title>{room}</Card.Title>
        </Row>
        <Row>
          <Card.Text>{description}</Card.Text>
        </Row>
        <Row>
          <Col>
            {starsCount.map((_, index) => (
              <StarFill key={index} style={{ color: "orange" }} />
            ))}
          </Col>
          <Col className="text-end">
            <span className="text-primary fw-bolder ">{price} USD</span>
          </Col>
        </Row>
        <Row>
          <Col className="">
            <Button variant="primary" className="bt-sm w-100">
              Book Room
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RoomSelectionForm;
