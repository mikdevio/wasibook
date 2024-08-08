import { Container } from "react-bootstrap";

import Sidebar from "./Sidebar";
import NavigationBar from "../common/Navbar";

import { BookingData, RoomData, StepData, UserData } from "../../types/Types";

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
      <Container fluid>
        <Sidebar />
      </Container>
    </>
  );
};

export default AdminBoard;
