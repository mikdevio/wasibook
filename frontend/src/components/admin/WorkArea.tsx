import { Card, Col, Container, Row } from "react-bootstrap";

const AdminBoard: React.FC = () => {
  return (
    <Container className="border">
      <Row>
        <Col className="col-auto">
          <Card>
            <h3>Area de trabajo</h3>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminBoard;
