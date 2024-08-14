import { Button, Card } from "react-bootstrap";

const ConfirmationForm: React.FC = () => {
  return (
    <>
      <Card className="shadow">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Title>Confirmación de reserva</Card.Title>
          <Button disabled>Finalizar</Button>
        </Card.Header>
        <Card.Body>
          <p>Información de confirmación</p>
        </Card.Body>
      </Card>
    </>
  );
};

export default ConfirmationForm;
