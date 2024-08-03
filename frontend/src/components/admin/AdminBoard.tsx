import { Container } from "react-bootstrap";

import Sidebar from "./Sidebar";
import NavigationBar from "../common/Navbar";

import { BookingData, RoomData, StepData } from "../../types/Types";

interface AdminBoardProps {
  rooms: RoomData[];
  bookingData: BookingData;
  steps: StepData[];
}

const AdminBoard: React.FC<AdminBoardProps> = (props: AdminBoardProps) => {
  //   const { rooms, bookingData, steps } = props;

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <h4>Admin Board</h4>
        <Sidebar />
      </Container>
    </>
  );
};

export default AdminBoard;
