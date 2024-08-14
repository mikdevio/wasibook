import { useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useReservation } from "../../common/BookingContext";
import { useAuth } from "../../common/AuthContext";
import { Stripe as StripeIcon } from "react-bootstrap-icons";
import DismissibleAlert from "../../common/DismissibleAlert";

interface CheckoutFormProps {
  onNext: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = (
  props: CheckoutFormProps
) => {
  const { onNext } = props;
  const stripe = useStripe();
  const elements = useElements();
  const { bookingData } = useReservation();

  const [amount, setAmount] = useState<number | undefined>(
    bookingData.pricesDictionary.total.value
  );

  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPayed, setIsPayed] = useState<boolean>(false);

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
      setMessage("El pago fue realizado de forma exitosa!!");
      setIsPayed(true);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title>Métodos de pago</Card.Title>
        <Button onClick={onNext} className={isPayed ? "" : "disabled"}>
          Siguiente
        </Button>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit} id="payment-form">
          <Row className="d-flex align-items-center text-center">
            <Col className="d-flex flex-column">
              <Form.Label>Cantidad por pagar:</Form.Label>
              <Form.Label className="fs-1 h1">
                {amount?.toFixed(2)} USD
              </Form.Label>
            </Col>
            <Col>
              <Row className="text-start mb-2">
                <Card.Title className="fs-3 d-flex align-items-center">
                  <StripeIcon />
                  <span className="ps-2">Stripe</span>
                </Card.Title>
              </Row>
              <Row>
                <PaymentElement id="payment-element" />
              </Row>
              <Row>
                <Col className="mt-4">
                  <Button
                    id="submit"
                    type="submit"
                    disabled={isProcessing || !stripe || !elements}
                    className="w-100"
                  >
                    <span id="button-text">
                      {isProcessing ? "Procesando ... " : "Pagar"}
                    </span>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-4">
            {message && <DismissibleAlert message={message} />}
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

interface PaymentFormProps {
  onNext: () => void;
}
const PaymentForm: React.FC<PaymentFormProps> = (props: PaymentFormProps) => {
  const { onNext } = props;
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
          <CheckoutForm onNext={onNext} />
        </Elements>
      )}
    </>
  );
};

export default PaymentForm;
