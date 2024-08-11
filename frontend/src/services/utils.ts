import moment from "moment";
import { ColDef } from "ag-grid-community";

// Function to caculate days between to dates
export const getStayLength = (dateIn: Date, dateOut: Date): number => {
  const start = moment(dateIn);
  const end = moment(dateOut);
  const diffDays = end.diff(start, "days");
  return diffDays <= 0 ? 1 : diffDays;
};

// Function to generate columnDefs for AgGridTables
export function generateColumnDefs<T>(obj: T): ColDef[] {
  let cols: ColDef[] = [];
  const objectKeys = obj as Record<string, unknown>;

  for (const key in objectKeys) {
    if (Object.prototype.hasOwnProperty.call(objectKeys, key)) {
      cols.push({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
      });
    }
  }

  cols = [
    ...cols,
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: "actionCellRenderer",
    },
  ];

  return cols;
}
