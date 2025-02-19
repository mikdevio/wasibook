import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { ColDef } from "ag-grid-community";

import { RoomData, RoomFieldDetails } from "../../types/Types";
import DynamicTable from "../common/DynamicTable";
import { roomGetAll } from "../../services/hadlerData";
import { generateColumnDefs } from "../../services/utils";

const RoomBoard: React.FC = () => {
  const [rooms, setRooms] = useState<RoomData[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsData = await roomGetAll();
      setRooms(roomsData);
      console.log(roomsData);
    };

    fetchRooms();
  }, []);

  const columnDefs: ColDef[] = generateColumnDefs<RoomData>(
    rooms[0],
    RoomFieldDetails
  );

  return (
    <Card className="mt-3 me-4 shadow h-100">
      <Card.Header>Room board</Card.Header>
      <Card.Body>
        <DynamicTable
          tableLabel="Habitaciones"
          rowData={rooms}
          columnDefs={columnDefs}
        />
      </Card.Body>
    </Card>
  );
};

export default RoomBoard;
