import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PlOv1HSjjNGSX26fUi13VsV1NzVdGp4TsLuMhX9tZlapFibxchopjfvZQSWEm7qVq5yxAVOldlnKKj2pQOkdAgz00Kg2L9n7"
); // Sustituye con tu clave pública de Stripe

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(stripe);
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, token } = await stripe.createToken(cardElement);

      if (error) {
        console.log("[error]", error);
        return;
      }

      if (token) {
        try {
          const response = await fetch(
            "http://localhost:3000/invoice/payStripe",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token.id,
                amount: amount,
              }),
            }
          );

          const data = await response.json();

          if (data.success) {
            alert("Pago realizado con éxito");
          } else {
            alert("Error en el pago: " + data.error);
          }
        } catch (error: any) {
          alert("Error en el pago: " + error.message);
        }
      }
    }
  };

  return (
    <Card>
      <Card.Title>PaymentForm</Card.Title>
      <Card.Body>
        <Form onSubmit={handleSubmit} as={Container} className="">
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Nombre Portador</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="Miguel Pantoja"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Form.Group>
                <Form.Label>Numero tarjeta: </Form.Label>
                <CardNumberElement className="form-control" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Fecha expiración: </Form.Label>
                <CardExpiryElement className="form-control" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Fecha expiración: </Form.Label>
                <CardCvcElement className="form-control" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Button type="submit" disabled={!stripe} className="w-100">
                Pagar
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

const PaymentForm: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentForm;
