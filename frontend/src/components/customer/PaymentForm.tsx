import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useReservation } from "../common/BookingContext";

const stripePromise = loadStripe(
  "pk_test_51PlOv1HSjjNGSX26fUi13VsV1NzVdGp4TsLuMhX9tZlapFibxchopjfvZQSWEm7qVq5yxAVOldlnKKj2pQOkdAgz00Kg2L9n7j"
); // Sustituye con tu clave pública de Stripe

const CheckoutForm: React.FC<{ clientSecret: string }> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { bookingData } = useReservation();
  const [amount, setAmount] = useState<number | undefined>(
    bookingData.pricesDictionary.total.value
  );

  useEffect(() => {
    setAmount(bookingData.pricesDictionary.total.value);
  }, [bookingData.pricesDictionary.total.value]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout-success",
      },
    });

    if (error) {
      console.log("[error]", error);
      alert("Error en el pago: " + error.message);
    } else {
      alert("Pago realizado con éxito");
    }
  };

  return (
    <Card>
      <Card.Title>PaymentForm</Card.Title>
      <Card.Body>
        <Form onSubmit={handleSubmit} as={Container}>
          <Row className="text-center">
            <Col className="d-flex flex-column">
              <Form.Label>Cantidad por pagar:</Form.Label>
              <Form.Label className="fs-1 h1">
                {amount?.toFixed(2)} USD
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>{clientSecret ? <PaymentElement /> : <p>Cargando...</p>}</Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Button
                type="submit"
                disabled={!stripe || !clientSecret}
                className="w-100"
              >
                Pagar
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

const PaymentForm: React.FC = () => {
  const { bookingData } = useReservation();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const amount = bookingData.pricesDictionary.total.value;

    if (amount) {
      // Crear el PaymentIntent en el backend
      fetch("http://localhost:3000/invoice/pay-stripe", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error("Error fetching clientSecret:", data.error);
            alert("Error fetching clientSecret: " + data.error);
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          alert("Error fetching clientSecret: " + error.message);
        });
    }
  }, [bookingData.pricesDictionary.total.value]);

  if (!clientSecret) {
    return <p>Cargando...</p>; // Mostrar mensaje de carga hasta que tengamos el clientSecret
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
};

export default PaymentForm;
