import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

import { RoomData } from "../../types/Types";
import React, { useEffect, useState } from "react";
import "./RoomCard.css";

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
        <Row className="justify-content-start">
          {roomList.length !== 0 &&
            roomList.map((room, index) => (
              <Col
                key={index}
                md={4}
                className="d-flex align-items-stretch mb-4"
              >
                <RoomCard {...room} />
              </Col>
            ))}
          {roomList.length === 0 && (
            <span className="mt-5 text-secondary text-center fs-4">
              No hay habitaciones registradas
            </span>
          )}
        </Row>
      </Card>
    </>
  );
};

interface RoomCardProps {
  img: any;
  stars: number;
  roomType: string;
  description: string;
  price: number;
}

const RoomCard: React.FC<RoomCardProps> = (props: RoomCardProps) => {
  const { img, roomType, stars, description, price } = props;
  const [imgSrc, setImgSrc] = useState<any | null>(null);

  const starsCount = Array.from({ length: stars });

  // console.log(img);

  useEffect(() => {
    try {
      // Convert img array into Uint8Array
      const uint8Array = new Uint8Array(img.data.data);
      // Create a Blob from the Uint8Array
      const blob = new Blob([uint8Array], { type: "image/png" });
      // Generate a URL for the Blob
      const url = URL.createObjectURL(blob);

      setImgSrc(url);

      return () => URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error decoding base64 string:", error);
    }
  }, [img]);

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
          <Card.Title>{roomType}</Card.Title>
        </Row>
        <Row>
          <Card.Text className="text-truncate-multiline">
            {description}
          </Card.Text>
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
