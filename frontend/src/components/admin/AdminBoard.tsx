import { Col, Container, Row } from "react-bootstrap";

import Sidebar from "./Sidebar";
import NavigationBar from "../common/Navbar";

import { BookingData, RoomData, StepData, UserData } from "../../types/Types";
import WorkArea from "./WorkArea";

interface AdminBoardProps {
  user: UserData;
  rooms: RoomData[];
  bookingData?: BookingData;
  steps: StepData[];
}

const AdminBoard: React.FC<AdminBoardProps> = (props: AdminBoardProps) => {
  const { user, rooms, bookingData, steps } = props;

  return (
    <>
      <NavigationBar userName={user.email} />
      <Container fluid className="d-inline-flex p-0">
        <Row className="justify-content-start">
          <Col>
            <Sidebar />
          </Col>
          <Col>
            <WorkArea />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminBoard;
