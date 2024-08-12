import { Card, Row } from "react-bootstrap";
import DynamicTable from "../common/DynamicTable";
import { useEffect, useState } from "react";
import { taxesGetAll } from "../../services/hadlerData";
import { generateColumnDefs } from "../../services/utils";
import { TaxData, TaxFieldDetails } from "../../types/Types";
import { ColDef } from "ag-grid-community";

const TaxBoard: React.FC = () => {
  const [taxes, setTaxes] = useState<TaxData[]>([]);

  useEffect(() => {
    const fetchTaxes = async () => {
      const taxesData = await taxesGetAll();
      setTaxes(taxesData);
    };

    fetchTaxes();
  }, []);

  const taxColumnDefs: ColDef[] = generateColumnDefs<TaxData>(
    taxes[0],
    TaxFieldDetails
  );

  return (
    <>
      <Card className="mt-3 me-4 shadow">
        <Card.Header>
          <h4>Tax board</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <DynamicTable
              tableLabel="Usuarios"
              rowData={taxes}
              columnDefs={taxColumnDefs}
            />
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default TaxBoard;
