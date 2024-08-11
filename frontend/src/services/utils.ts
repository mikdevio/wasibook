import moment from "moment";
import { ColDef } from "ag-grid-community";
import { FieldDetails } from "../types/Types";

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
      }
    }
  }

  cols = [
    ...cols,
    {
      headerName: "Acciones",
      field: "actions",
      cellRenderer: "actionCellRenderer",
    },
  ];

  return cols;
}
