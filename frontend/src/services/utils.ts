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

export function generateColumnDefs<T>(obj: T, details: FieldDetails): ColDef[] {
  let cols: ColDef[] = [];
  const objectKeys = obj as Record<string, unknown>;

  console.log(obj);
  for (const key in objectKeys) {
    if (
      Object.prototype.hasOwnProperty.call(objectKeys, key) &&
      !details.fieldExcluded.includes(key)
    ) {
      const fieldHeader = details.fieldHeaders.find((f) => f.tag === key);
      const value = objectKeys[key];

      if (key === "img") {
        cols.push({
          field: key,
          headerName: "Imagen",
          cellRenderer: "imageCellRenderer",
        });
      } else if (Array.isArray(value)) {
        console.log(`Como array => ${key}`);
        // Si el array contiene objetos, usar un cellRenderer especializado
        if (typeof value[0] === "object" && value[0] !== null) {
          cols.push({
            field: key,
            headerName: fieldHeader?.headerName || "Lista de Objetos",
            cellRenderer: "arrayObjectCellRenderer",
            cellRendererParams: {
              fieldToShow:
                details.fieldHeaders
                  .find((f) => f.tag.startsWith(`${key}.`))
                  ?.tag.split(".")[1] || "name",
            },
          });
        } else {
          cols.push({
            field: key,
            headerName: fieldHeader?.headerName || "Lista de Elementos",
            cellRenderer: "listCellRenderer",
          });
        }
      } else if (typeof value === "object" && value !== null) {
        const nestedField = details.fieldHeaders.find((f) =>
          f.tag.startsWith(`${key}.`)
        );
        console.log(`Como objeto => ${key}`);
        if (nestedField) {
          const nestedKey = nestedField.tag.split(".").slice(1).join(".");
          cols.push({
            field: `${key}.${nestedKey}`,
            headerName: nestedField.headerName,
          });
        } else {
          cols.push({
            field: key,
            headerName: fieldHeader?.headerName || "Objeto",
            cellRenderer: "objectCellRenderer",
          });
        }
      } else {
        cols.push({
          field: key,
          headerName: fieldHeader?.headerName || key,
        });
      }
    }
  }

  // Agregar columna de Acciones
  cols.push({
    headerName: "Acciones",
    field: "actions",
    cellRenderer: "actionCellRenderer",
    cellRendererParams: {
      id_in: objectKeys?._id,
    },
  });

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
