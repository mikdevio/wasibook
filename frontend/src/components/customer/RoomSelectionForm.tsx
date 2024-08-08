import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

import { CheckType, RoomData, RoomReservedData } from "../../types/Types";
import React, { useEffect, useState } from "react";
import "./CustomerBoard.css";
import { useReservation } from "../common/BookingContext";

interface RoomSelectionFormProps {
  roomList: RoomData[];
}

const RoomSelectionForm: React.FC<RoomSelectionFormProps> = (
  props: RoomSelectionFormProps
) => {
  const { roomList } = props;

  return (
    <>
      <Card className="shadow pt-2 h-100">
        <Card.Header>
          <Card.Title>Rooms</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row className="justify-content-start">
            {roomList.length !== 0 &&
              roomList.map((room, index) => (
                <Col
                  key={index}
                  md={4}
                  className="d-flex align-items-stretch mb-4"
                >
                  <RoomCard roomData={room} />
                </Col>
              ))}
            {roomList.length === 0 && (
              <span className="mt-5 text-secondary text-center fs-4">
                No hay habitaciones registradas
              </span>
            )}
          </Row>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </>
  );
};

interface RoomCardProps {
  roomData: RoomData;
}

const RoomCard: React.FC<RoomCardProps> = (props: RoomCardProps) => {
  const { roomData } = props;
  const [imgSrc, setImgSrc] = useState<any | null>(null);
  const { addReservation, updatePriceDictionary } = useReservation();

  const starsCount = Array.from({ length: roomData.stars });

  // console.log(img);

  useEffect(() => {
    try {
      // Convert img array into Uint8Array
      const uint8Array = new Uint8Array(roomData.img.data.data);
      // Create a Blob from the Uint8Array
      const blob = new Blob([uint8Array], { type: "image/png" });
      // Generate a URL for the Blob
      const url = URL.createObjectURL(blob);

      setImgSrc(url);

      return () => URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error decoding base64 string:", error);
    }
  }, [roomData.img]);

  const handleAddReservation = () => {
    const newReservation: RoomReservedData = {
      roomData: roomData,
      checkinData: {
        type: CheckType.IN,
        date: new Date(),
      },
      checkoutData: {
        type: CheckType.OUT,
        date: new Date(Date.now() + 86400000),
      },
    };

    addReservation(newReservation);
    updatePriceDictionary();
  };

  // console.log(imgSrc);

  return (
    <Card className="mt-2" style={{ width: "100%", height: "280px" }}>
      {imgSrc && (
        <Card.Img
          variant="top"
          src={imgSrc}
          className="center-image"
          style={{ width: "100%", height: "40%" }}
        />
      )}
      <Card.Body as={Container} className="px-3">
        <Row>
          <Col>
            <Card.Title>{`Room ${roomData.code}`}</Card.Title>
          </Col>
          <Col className="col-4 text-end">
            <Badge bg="dark">{roomData.roomType}</Badge>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Text className="text-truncate-multiline">
              {roomData.description}
            </Card.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            {starsCount.map((_, index) => (
              <StarFill key={index} style={{ color: "orange" }} />
            ))}
          </Col>
          <Col className="text-end">
            <span className="text-primary fw-bolder ">
              {roomData.price} USD
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="">
            <Button
              variant="primary"
              className="bt-sm w-100"
              onClick={() => handleAddReservation()}
            >
              Book Room
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RoomSelectionForm;
