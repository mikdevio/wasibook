import { Col, Container, Row } from "react-bootstrap";

import Sidebar from "./Sidebar";
import NavigationBar from "../common/Navbar";

import { RoomData } from "../../types/Types";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { roomGetAll } from "../../services/hadlerData";

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
            <Sidebar />
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
