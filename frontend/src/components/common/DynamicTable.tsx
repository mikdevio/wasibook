import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "react-bootstrap";
import { Pen, XOctagon } from "react-bootstrap-icons";

interface DynamicTableProps<T> {
  rowData: T[];
  columnDefs: ColDef[];
}

const DynamicTable = <T,>({ rowData, columnDefs }: DynamicTableProps<T>) => {
  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  const components = {
    actionCellRenderer: ActionCellRenderer,
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        components={components}
      />
    </div>
  );
};

// Componente para los botones de acción
const ActionCellRenderer = () => {
  const handleEdit = () => {
    alert(`Edit`);
  };

  const handleDelete = () => {
    alert(`Delete`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Button className="btn-sm btn-primary" onClick={handleEdit}>
        <Pen />
      </Button>
      <Button className="btn-sm btn-danger ms-2" onClick={handleDelete}>
        <XOctagon />
      </Button>
    </div>
  );
};

export default DynamicTable;
