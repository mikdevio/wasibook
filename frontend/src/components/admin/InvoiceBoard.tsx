import { Card, Row } from "react-bootstrap";
import { InvoiceData, InvoiceDataDetails } from "../../types/Types";
import { useEffect, useState } from "react";
import { invoiceGetAll } from "../../services/hadlerData";
import { ColDef } from "ag-grid-community";
import { generateColumnDefs } from "../../services/utils";
import DynamicTable from "../common/DynamicTable";

const InvoiceBoard: React.FC = () => {
  const [invoice, setInvoice] = useState<InvoiceData[]>([]);

  useEffect(() => {
    const fetchTaxes = async () => {
      const invoiceData = await invoiceGetAll();
      setInvoice(invoiceData);
    };

    fetchTaxes();
  }, []);

  const invoiceColumnDefs: ColDef[] = generateColumnDefs<InvoiceData>(
    invoice[0],
    InvoiceDataDetails
  );

  return (
    <>
      <Card className="mt-3 me-4 shadow">
        <Card.Header>
          <h4>Invoices board</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <DynamicTable
              tableLabel="Usuarios"
              rowData={invoice}
              columnDefs={invoiceColumnDefs}
            />
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default InvoiceBoard;
