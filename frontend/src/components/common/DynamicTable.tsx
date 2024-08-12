import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Pen, Trash } from "react-bootstrap-icons";

interface DynamicTableProps<T> {
  tableLabel: string;
  rowData: T[];
  columnDefs: ColDef[];
}

const DynamicTable = <T,>({
  tableLabel,
  rowData,
  columnDefs,
}: DynamicTableProps<T>) => {
  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  const components = {
    actionCellRenderer: ActionCellRenderer,
    imageCellRenderer: ImageCellRenderer,
  };

  return (
    <>
      <Row className="mb-2">
        <Col>
          <Card.Title>{tableLabel}</Card.Title>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm">Agregar</Button>
        </Col>
      </Row>
      <Row>
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
      </Row>
    </>
  );
};

// Actions table component
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
        <Trash />
      </Button>
    </div>
  );
};

interface ImageCellRendererProps extends ICellRendererParams {
  value: {
    data: {
      data: number[];
    };
  };
}

// Image table components
const ImageCellRenderer: React.FC<ImageCellRendererProps> = (props) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    if (props.value && props.value.data) {
      try {
        // Convertir el array de datos binarios en Uint8Array
        const uint8Array = new Uint8Array(props.value.data.data);
        // Crear un Blob a partir del Uint8Array
        const blob = new Blob([uint8Array], { type: "image/png" });
        // Generar una URL para el Blob
        const url = URL.createObjectURL(blob);

        setImgSrc(url);

        // Limpiar la URL cuando el componente se desmonta
        return () => URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error decoding image:", error);
      }
    }
  }, [props.value]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      {imgSrc ? (
        <img src={imgSrc} alt="img" style={{ width: "50px", height: "50px" }} />
      ) : (
        "No Image"
      )}
    </div>
  );
};

export default DynamicTable;
