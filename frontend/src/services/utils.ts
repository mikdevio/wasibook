import moment from "moment";
import { ColDef } from "ag-grid-community";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import JsBarcode from "jsbarcode";

import {
  FieldDetails,
  RoomReservedData,
  CustomerData,
  BkRoomReservationData,
  BkReservationData,
  BookingData,
  InvoiceData,
  Invoice,
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

  // console.log(obj);
  for (const key in objectKeys) {
    if (
      Object.prototype.hasOwnProperty.call(objectKeys, key) &&
      !details.fieldExcluded.includes(key)
    ) {
      const fieldHeader = details.fieldHeaders.find((f) => f.tag === key);
      const value = objectKeys[key];

      if (key === "user" && typeof value === "object" && value !== null) {
        // Extraer firstName y lastName si existen
        if ("firstName" in value) {
          cols.push({
            field: "user.firstName",
            headerName: "Nombres cliente",
          });
        }
        if ("lastName" in value) {
          cols.push({
            field: "user.lastName",
            headerName: "Apellidos cliente",
          });
        }
      } else if (key === "img") {
        cols.push({
          field: key,
          headerName: "Imagen",
          cellRenderer: "imageCellRenderer",
        });
      } else if (Array.isArray(value)) {
        // console.log(`Como array => ${key}`);
        if (typeof value[0] === "object" && value[0] !== null) {
          cols.push({
            field: key,
            headerName: fieldHeader?.headerName || "Cuartos",
            cellRenderer: "arrayObjectCellRenderer",
            cellRendererParams: {
              objectTag:
                details.fieldHeaders
                  .find((f) => f.tag.startsWith(`${key}.`))
                  ?.tag.split(".")[1] || "name",
              fieldToShow:
                details.fieldHeaders
                  .find((f) => f.tag.startsWith(`${key}.`))
                  ?.tag.split(".")[2] || "name",
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
        // console.log(`Como objeto => ${key}`);

        // Caso especial para "room" (si es el objeto que representa el cuarto)
        if (key === "room" && typeof value === "object" && value !== null) {
          if ("name" in value) {
            // Mostrar el nombre del cuarto (si tiene la propiedad "name")
            cols.push({
              field: "room.name",
              headerName: "Nombre del cuarto",
            });
          } else {
            // Si no tiene un "name", mostrar solo el objeto
            cols.push({
              field: key,
              headerName: fieldHeader?.headerName || "Objeto",
              cellRenderer: "objectCellRenderer",
            });
          }
        } else if (nestedField) {
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
      objectType: details.objectType,
    },
  });

  return cols;
}

// export function generateColumnDefs<T>(obj: T, details: FieldDetails): ColDef[] {
//   let cols: ColDef[] = [];
//   const objectKeys = obj as Record<string, unknown>;
//   console.log(objectKeys);

//   for (const field of details.fieldHeaders) {
//     const { tag, headerName } = field;
//     const keyParts = tag.split(".");
//     const topLevelKey = keyParts[0];
//   }

//   for (const key in objectKeys) {
//     if (
//       Object.prototype.hasOwnProperty.call(objectKeys, key) &&
//       !details.fieldExcluded.includes(key)
//     ) {
//       const fieldHeader = details.fieldHeaders.find((f) => f.tag === key);
//       const value = objectKeys[key];

//       if (key === "img") {
//         cols.push({
//           field: key,
//           headerName: "Imagen",
//           cellRenderer: "imageCellRenderer",
//         });
//       } else if (Array.isArray(value)) {
//         // console.log(`Como array => ${key}`);
//         // Si el array contiene objetos, usar un cellRenderer especializado
//         if (typeof value[0] === "object" && value[0] !== null) {
//           cols.push({
//             field: key,
//             headerName: fieldHeader?.headerName || "Lista de Objetos",
//             cellRenderer: "arrayObjectCellRenderer",
//             cellRendererParams: {
//               fieldToShow:
//                 details.fieldHeaders
//                   .find((f) => f.tag.startsWith(`${key}.`))
//                   ?.tag.split(".")[1] || "name",
//             },
//           });
//         } else {
//           cols.push({
//             field: key,
//             headerName: fieldHeader?.headerName || "Lista de Elementos",
//             cellRenderer: "listCellRenderer",
//           });
//         }
//       } else if (typeof value === "object" && value !== null) {
//         const nestedField = details.fieldHeaders.find((f) =>
//           f.tag.startsWith(`${key}.`)
//         );
//         // console.log(`Como objeto => ${key}`);
//         if (nestedField) {
//           const nestedKey = nestedField.tag.split(".").slice(1).join(".");
//           cols.push({
//             field: `${key}.${nestedKey}`,
//             headerName: nestedField.headerName,
//           });
//         } else {
//           cols.push({
//             field: key,
//             headerName: fieldHeader?.headerName || "Objeto",
//             cellRenderer: "objectCellRenderer",
//           });
//         }
//       } else {
//         cols.push({
//           field: key,
//           headerName: fieldHeader?.headerName || key,
//         });
//       }
//     }
//   }
//
//   // Agregar columna de Acciones
//   cols.push({
//     headerName: "Acciones",
//     field: "actions",
//     cellRenderer: "actionCellRenderer",
//     cellRendererParams: {
//       id_in: objectKeys?._id,
//     },
//   });

//   return cols;
// }

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

// Convertir InvoiceBK to InvoiceFK
export function transformInvoiceData(inputData: any): Invoice {
  // console.log(inputData);

  const invoiceObjetc: Invoice = {
    id: inputData._id,
    invoiceNumber: inputData._id, // Si tienes un número real de factura, cámbialo aquí
    invoiceAuthNumber: "", // Si hay un número de autorización, agrégalo aquí
    customerTaxNumber: inputData.reservation?.user?.taxNumber || "",
    customerName: `${inputData.reservation?.user?.firstName || ""} ${
      inputData.reservation?.user?.lastName || ""
    }`,
    customerEmail: inputData.reservation?.user?.email || "",
    customerAddress: inputData.reservation?.user?.address || "",
    customerPhoneNumber: inputData.reservation?.user?.phone || "",
    companyTaxNumber: inputData.companyTaxNumber,
    companyName: inputData?.companyName || "",
    companyEmail: inputData?.companyEmail || "",
    companyAddress: inputData.companyAddress || "",
    companyPhoneNumber: inputData.companyPhoneNumber || "",
    items:
      inputData.reservation?.rooms.map((room: any) => ({
        code: room.room?.code || "",
        code_aux: "", // Puedes agregar un código auxiliar si lo tienes
        additional_details: "Not defined", // Puedes ajustar esto según sea necesario
        subsidy: 0, // No hay subsidio en los datos originales
        discount: 0, // Puedes calcular un descuento si aplica
        description: room.room?.roomType || "Room", // Descripción del producto
        quantity: getStayLength(room.checkInDate, room.checkOutDate), // Calcula dias
        unitPrice: room.room?.price || 0, // Precio de la habitación
      })) || [],
    date: inputData.issueDate || new Date().toISOString(),
    taxRate: 15, // Puedes calcularlo si tienes información de impuestos
  };

  return invoiceObjetc;
}

// TODO: Generacion de factura
export const generateInvoicePDF = (invoiceData: Invoice): void => {
  const { id, items, taxRate = 0 } = invoiceData;

  // Constantes diseño
  const COL_1_INV_HEADER = 14;
  const ROW_1_INV_HEADER = 15;
  const COL_1_DATA = 14;
  const COL_2_DATA = 120;

  // Cálculo de totales
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  // Condigo de barras autorizacion SRI
  // Crear un canvas para generar el código de barras
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, invoiceData.invoiceAuthNumber, {
    format: "CODE128",
    width: 2, // Grosor de las líneas
    height: 50, // Altura del código de barras
    displayValue: true, // Muestra el número debajo
  });

  // Convertir el canvas a una imagen base64
  const barcodeImage = canvas.toDataURL("image/png");

  // Crear documento PDF
  const doc = new jsPDF();

  // Título
  const currentFont = doc.getFont().fontName;
  doc.setFontSize(18);
  doc
    .text(
      `Factura N° ${invoiceData.invoiceNumber}`,
      COL_1_INV_HEADER,
      ROW_1_INV_HEADER
    )
    .setFontSize(8);
  doc.text(
    `Fecha: ${new Date(invoiceData.date).toLocaleDateString()}`,
    COL_1_INV_HEADER,
    ROW_1_INV_HEADER + 5
  );
  doc.text(
    `Autorización: ${invoiceData.invoiceAuthNumber}`,
    COL_1_INV_HEADER,
    ROW_1_INV_HEADER + 10
  );
  doc.addImage(barcodeImage, "PNG", 110, 8, 85, 12);

  // Datos compañia
  doc.setFontSize(9).setFont(currentFont, "bold");
  doc
    .text(`Emisor:`, COL_1_DATA, ROW_1_INV_HEADER + 30)
    .setFont(currentFont, "normal");
  doc.text(`${invoiceData.companyName}`, COL_1_DATA, ROW_1_INV_HEADER + 35);
  doc.text(
    `${invoiceData.companyTaxNumber}`,
    COL_1_DATA,
    ROW_1_INV_HEADER + 40
  );
  doc.text(`${invoiceData.companyEmail}`, COL_1_DATA, ROW_1_INV_HEADER + 45);
  doc.text(
    `${invoiceData.companyPhoneNumber}`,
    COL_1_DATA,
    ROW_1_INV_HEADER + 50
  );
  doc.text(`${invoiceData.companyAddress}`, COL_1_DATA, ROW_1_INV_HEADER + 55);

  // Datos cliente:
  doc.setFont(currentFont, "bold");
  doc
    .text(`Receptor:`, COL_2_DATA, ROW_1_INV_HEADER + 30)
    .setFont(currentFont, "normal");
  doc.text(`${invoiceData.customerName}`, COL_2_DATA, ROW_1_INV_HEADER + 35);
  doc.text(
    `${invoiceData.customerTaxNumber}`,
    COL_2_DATA,
    ROW_1_INV_HEADER + 40
  );
  doc.text(`${invoiceData.customerEmail}`, COL_2_DATA, ROW_1_INV_HEADER + 45);
  doc.text(
    `${invoiceData.customerPhoneNumber}`,
    COL_2_DATA,
    ROW_1_INV_HEADER + 50
  );
  doc.text(`${invoiceData.customerAddress}`, COL_2_DATA, ROW_1_INV_HEADER + 55);

  // 🟢 Tabla de Información del Cliente
  let finalY = ROW_1_INV_HEADER + 60; // Controlamos la posición de las tablas
  autoTable(doc, {
    startY: finalY,
    head: [
      [
        "Cod.",
        "Aux.Cod",
        "Cantidad",
        "Descripción",
        "Detalles Ad.",
        "Precio Unitario",
        "Subsidio",
        "Precio Subs.",
        "Descuento",
        "Precio Desc.",
        "Total",
      ],
    ],
    body: items.map((item) => [
      item.code,
      item.code_aux,
      item.quantity.toString(),
      item.description,
      item.additional_details,
      `$${item.unitPrice.toFixed(2)}`,
      item.subsidy,
      `$${(item.unitPrice * (1 - item.subsidy)).toFixed(2)}`,
      item.discount,
      `$${(item.unitPrice * (1 - item.subsidy) * (1 - item.discount)).toFixed(
        2
      )}`,
      `$${(
        item.quantity *
        item.unitPrice *
        (1 - item.subsidy) *
        (1 - item.discount)
      ).toFixed(2)}`,
    ]),
    styles: { fontSize: 8 },
  });

  // 🔵 Tabla de Totales
  // Definir fuente
  const COL_1_WIDTH = 40;
  const COL_2_WIDTH = 20;
  const TABLE_WIDTH =
    (doc as any).lastAutoTable?.finalWidth || COL_1_WIDTH + COL_2_WIDTH; // Fallback si no se calcula

  const pageWidth = doc.internal.pageSize.width;
  const marginRight = 14; // Espacio entre tabla y borde derecho
  const marginLeft = pageWidth - TABLE_WIDTH - marginRight;
  console.log(pageWidth, TABLE_WIDTH, marginLeft);

  finalY =
    (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable
      .finalY ?? finalY + 20;
  autoTable(doc, {
    startY: finalY + 5,
    head: [],
    tableWidth: "auto",
    margin: { left: marginLeft },
    body: [
      ["Subtotal sin IVA", `$${subtotal.toFixed(2)}`],
      ["IVA 15%", `$${tax.toFixed(2)}`],
      ["Total", `$${total.toFixed(2)}`],
    ],
    styles: { fontSize: 8, fillColor: false },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: COL_1_WIDTH, textColor: 0 },
      1: { cellWidth: COL_2_WIDTH },
    },
  });

  // Guardar PDF
  doc.save(`Factura_${id}.pdf`);
  doc.output("dataurlnewwindow");
};

// Generando codigos alaeatorios para Clave de autorizacion de facturas
export function generateRandomBigInt(digits: number): string {
  let min = BigInt("1" + "0".repeat(digits - 1)); // Mínimo valor de 50 dígitos
  let max = BigInt("9".repeat(digits)); // Máximo valor de 50 dígitos

  let randomNum = min + BigInt(Math.floor(Math.random() * Number(max - min)));

  return randomNum.toString();
}
