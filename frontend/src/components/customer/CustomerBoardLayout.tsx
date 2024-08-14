import { Col, Container, Row } from "react-bootstrap";

import NavigationBar from "../common/Navbar";
import { CustomerSidebarDetails } from "../../types/Types";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";

const CustomerBoardLayout: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <Container fluid className="ps-0">
        <Row>
          <Col className="col-2">
            <Sidebar details={CustomerSidebarDetails} />
          </Col>
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CustomerBoardLayout;
