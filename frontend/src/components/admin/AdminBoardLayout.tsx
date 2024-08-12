import { Col, Container, Row } from "react-bootstrap";

import Sidebar from "../common/Sidebar";
import NavigationBar from "../common/Navbar";

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { roomGetAll } from "../../services/hadlerData";
import { AdminSidebarDetails, RoomData } from "../../types/Types";

const AdminBoardLayout: React.FC = () => {
  const [rooms, setRooms] = useState<RoomData[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsData = await roomGetAll();
      setRooms(roomsData);
    };

    fetchRooms();
  }, []);

  return (
    <>
      <NavigationBar />
      <Container fluid className="p-0 ">
        <Row className="justify-content-start">
          <Col className="col-2">
            <Sidebar details={AdminSidebarDetails} />
          </Col>
          <Col className="col-10">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminBoardLayout;
