import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useReservation } from "../common/BookingContext";
import { useAuth } from "../common/AuthContext";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { bookingData } = useReservation();

  const [amount, setAmount] = useState<number | undefined>(
    bookingData.pricesDictionary.total.value
  );

  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    setAmount(bookingData.pricesDictionary.total.value);
  }, [bookingData.pricesDictionary.total.value]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // FIXME: Fix payment confirmation
    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment status: " + paymentIntent.status + "!!");
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <Card>
      <Card.Title>PaymentForm</Card.Title>
      <Card.Body>
        <Form onSubmit={handleSubmit} id="payment-form">
          <Row className="text-center">
            <Col className="d-flex flex-column">
              <Form.Label>Cantidad por pagar:</Form.Label>
              <Form.Label className="fs-1 h1">
                {amount?.toFixed(2)} USD
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <PaymentElement id="payment-element" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Button
                id="submit"
                type="submit"
                disabled={isProcessing || !stripe || !elements}
                className="w-100"
              >
                <span id="button-text">
                  {isProcessing ? "Procesando ... " : "Paga ahora"}
                </span>
              </Button>
            </Col>
          </Row>
          {message && <div id="payment-message">{message}</div>}
        </Form>
      </Card.Body>
    </Card>
  );
};

const PaymentForm: React.FC = () => {
  const { user } = useAuth();
  const { bookingData } = useReservation();
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/invoice/pay-stripe", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: bookingData.pricesDictionary.total.value,
        customer: `${user.firstName} ${user.lastName}`,
        email: user.email,
      }),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default PaymentForm;
