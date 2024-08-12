import { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { ReservationData, ReservationFieldDetails } from "../../types/Types";
import { reservationGetAll } from "../../services/hadlerData";
import { generateColumnDefs } from "../../services/utils";
import { ColDef } from "ag-grid-community";
import DynamicTable from "../common/DynamicTable";

const ReservationBoard: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationData[]>([]);

  useEffect(() => {
    const fetchTaxes = async () => {
      const reservationsData = await reservationGetAll();
      setReservations(reservationsData);
    };

    fetchTaxes();
  }, []);

  const reservationsColumnDefs: ColDef[] = generateColumnDefs<ReservationData>(
    reservations[0],
    ReservationFieldDetails
  );

  return (
    <>
      <Card className="mt-3 me-4 shadow">
        <Card.Header>
          <h4>Reservation Board</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <DynamicTable
              tableLabel="Reservaciones"
              rowData={reservations}
              columnDefs={reservationsColumnDefs}
            />
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ReservationBoard;
