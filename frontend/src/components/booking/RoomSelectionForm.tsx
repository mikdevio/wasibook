import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { RoomData } from "../../types/Types";

interface RoomSelectionFormProps {
  roomList: RoomData[];
}

const RoomSelectionForm: React.FC<RoomSelectionFormProps> = (
  props: RoomSelectionFormProps
) => {
  const { roomList } = props;

  return (
    <Container>
      <Card className="shadow p-2">
        <Row className="justify-content-center">
          {roomList.map((room, index) => (
            <Col ke={index} md={4} className="d-flex align-items-stretch mb-4">
              <RoomCard {...room} />
            </Col>
          ))}
        </Row>
      </Card>
    </Container>
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

  return (
    <Card className="mt-2" style={{ width: "250px", height: "250px" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{room}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Row>
          <Col>
            <span>{stars}</span>
          </Col>
          <Col>
            <span>{price}</span>
          </Col>
        </Row>
        <Row>
          <Button variant="success">Book Room</Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RoomSelectionForm;
