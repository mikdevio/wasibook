import moment from "moment";
import { ColDef } from "ag-grid-community";
import {
  FieldDetails,
  RoomReservedData,
  CustomerData,
  BkRoomReservationData,
  BkReservationData,
  BookingData,
  InvoiceData,
} from "../types/Types";

// Function to caculate days between to dates
export const getStayLength = (dateIn: Date, dateOut: Date): number => {
  const start = moment(dateIn);
  const end = moment(dateOut);
  const diffDays = end.diff(start, "days");
  return diffDays <= 0 ? 1 : diffDays;
};

// Function to generate columnDefs for AgGridTables
export function generateColumnDefs<T>(obj: T, details: FieldDetails): ColDef[] {
  let cols: ColDef[] = [];
  const objectKeys = obj as Record<string, unknown>;
  console.log(objectKeys);
  for (const key in objectKeys) {
    // console.log(key, details.fieldExcluded.includes(key));
    if (
      Object.prototype.hasOwnProperty.call(objectKeys, key) &&
      !details.fieldExcluded.includes(key)
    ) {
      if (key !== "img") {
        cols.push({
          field: key,
          headerName: details.fieldHeaders.filter((f) => f.tag === key)[0]
            ?.headerName,
        });
      } else if (key === "img") {
        cols.push({
          field: key,
          headerName: "Imagen",
          cellRenderer: "imageCellRenderer",
        });
      } else if (typeof key === "object") {
        // FIXME: no se muestra la lista de elementos no detecta el tipo de datos
        cols.push({
          field: key,
          headerName:
            details.fieldHeaders.filter((f) => f.tag === key)[0]?.headerName ||
            "Lista de Objetos",
          cellRenderer: "listCellRenderer",
          cellRendererParams: {
            itemList: ["Uno", "Dos", "Tres"],
          },
        });
      }
    }
  }

  cols = [
    ...cols,
    {
      headerName: "Acciones",
      field: "actions",
      cellRenderer: "actionCellRenderer",
      cellRendererParams: {
        id_in: objectKeys?._id,
      },
    },
  ];

  return cols;
}

// Function to generate objecto to be sent to BK
export const getReservation = (
  customerData: CustomerData,
  roomReservedList: RoomReservedData[]
) => {
  const roomsReserved: BkRoomReservationData[] = roomReservedList.map(
    (roomData) => ({
      room: roomData.roomData._id,
      checkInDate: roomData.checkinData.date,
      checkOutDate: roomData.checkoutData.date,
    })
  );

  // 1. crear objecto BkReservationData
  const newReservation: BkReservationData = {
    user: customerData._id,
    rooms: roomsReserved,
    status: "confirmed",
  };

  return newReservation;
};

export const getInvoice = (reservId: string, bookingData: BookingData) => {
  const totalPriceData = Object.values(bookingData.pricesDictionary).find(
    (price) => price.tag === "Total"
  );

  const newInvoice: InvoiceData = {
    reservation: reservId,
    amount: totalPriceData ? totalPriceData.value : 0,
    issueDate: new Date(),
    dueDate: new Date(),
    status: "paid",
    details: "Not defined",
  };

  return newInvoice;
};
