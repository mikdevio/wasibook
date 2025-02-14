import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import { PricesDictionary } from "../../../types/Types";
import { useReservation } from "../BookingContext";

interface PriceSummaryProps {
  prices_dict?: PricesDictionary;
}

const PriceSummary: React.FC<PriceSummaryProps> = (
  props: PriceSummaryProps
) => {
  const { prices_dict } = props;
  const { bookingData } = useReservation();

  return (
    <Container className="p-0 mt-4">
      <Card.Title>Resúmen de costos:</Card.Title>
      {prices_dict
        ? Object.entries(bookingData.pricesDictionary).map(
            ([id, priceData]) => (
              <PriceRow
                key={id}
                tag_name={priceData.tag}
                value={priceData.value}
              />
            )
          )
        : null}
      {/* <Row className="mt-4 px-2">
        <Button variant="primary" className="">
          Request to book
        </Button>
      </Row> */}
    </Container>
  );
};

interface PriceRowProps {
  tag_name: string;
  value: number;
}

const PriceRow: React.FC<PriceRowProps> = (props: PriceRowProps) => {
  const { tag_name, value } = props;
  return (
    <Row className="justify-content-between">
      <Col>{tag_name}</Col>
      <Col className="text-end">${value.toFixed(2)}</Col>
    </Row>
  );
};

export default PriceSummary;
