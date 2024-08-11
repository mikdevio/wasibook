import { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { ColDef } from "ag-grid-community";

import DynamicTable from "../common/DynamicTable";
import { CustomerData, UserData } from "../../types/Types";
import { generateColumnDefs } from "../../services/utils";
import { customerGetAll, userGetAll } from "../../services/hadlerData";
import { CustomerFieldDetails, UserFieldDetails } from "../../types/Types";

const PersonelBoard: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [customers, setCustomers] = useState<CustomerData[]>([]);

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

  const userColumnDefs: ColDef[] = generateColumnDefs<UserData>(
    users[0],
    UserFieldDetails
  );
  const customerColumnDefs: ColDef[] = generateColumnDefs<CustomerData>(
    customers[0],
    CustomerFieldDetails
  );

  return (
    <Card className="mt-3 me-4 shadow">
      <Card.Header>
        <h4>Personal</h4>
      </Card.Header>
      <Card.Body className="mt-0">
        <Row>
          <DynamicTable
            tableLabel="Usuarios"
            rowData={users}
            columnDefs={userColumnDefs}
          />
        </Row>
        <Row className="mt-4">
          <DynamicTable
            tableLabel="Clientes"
            rowData={customers}
            columnDefs={customerColumnDefs}
          />
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PersonelBoard;
