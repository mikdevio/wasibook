import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ColDef } from "ag-grid-community";

import { UserData } from "../../types/Types";
import DynamicTable from "../common/DynamicTable";
import { customerGetAll, userGetAll } from "../../services/hadlerData";
import { generateColumnDefs } from "../../services/utils";

const PersonelBoard: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [customers, setCustomers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await userGetAll();
      setUsers(usersData);
    };
    const fetchCustomers = async () => {
      const customersData = await customerGetAll();
      setCustomers(customersData);
    };

    fetchUsers();
    fetchCustomers();
  }, []);

  const columnDefs: ColDef[] = generateColumnDefs<UserData>(users[0]);

  return (
    <Card className="mt-3 me-4 shadow">
      <Card.Header>Room board</Card.Header>
      <Card.Body className="my-2">
        <Row>
          <Col>
            <Card.Title>Usuarios</Card.Title>
          </Col>
        </Row>
        <Row>
          <DynamicTable rowData={users} columnDefs={columnDefs} />
        </Row>
        <Row className="mt-4">
          <Col>
            <Card.Title>Clientes</Card.Title>
          </Col>
        </Row>
        <Row>
          <DynamicTable rowData={customers} columnDefs={columnDefs} />
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PersonelBoard;
