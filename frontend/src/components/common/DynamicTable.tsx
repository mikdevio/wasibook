import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { EyeFill, Pen, Trash } from "react-bootstrap-icons";

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
    listCellRenderer: ListCellRenderer,
    objectCellRenderer: ObjectCellRenderer,
    arrayObjectCellRenderer: ArrayObjectCellRenderer,
  };

  return (
    <>
      <Row className="mb-2">
        <Col>
          <Card.Title>{tableLabel}</Card.Title>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm">Nuevo</Button>
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

interface ActionCellRendererProps extends ICellRendererParams {
  // id_in: string;
}

// Actions table component
const ActionCellRenderer: React.FC<ActionCellRendererProps> = (
  props: ActionCellRendererProps
) => {
  const { data } = props;
  const [id, setID] = useState<string>(data._id);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleView = () => {
    handleShowModal();
  };

  const handleEdit = () => {
    alert(`Edit ${id}`);
  };

  const handleDelete = () => {
    alert(`Delete ${id}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Button className="btn-sm btn-secondary" onClick={handleView}>
        <EyeFill />
      </Button>
      <Button className="btn-sm btn-primary ms-2" onClick={handleEdit}>
        <Pen />
      </Button>
      <Button className="btn-sm btn-danger ms-2" onClick={handleDelete}>
        <Trash />
      </Button>
      <ShowModal show={showModal} onClose={handleCloseModal} modalData={data} />
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

interface ListCellRendererProps extends ICellRendererParams {
  value: string[];
}

const ListCellRenderer: React.FC<ListCellRendererProps> = (
  props: ListCellRendererProps
) => {
  const { value } = props;

  if (!Array.isArray(value) || value.length === 0) {
    return <span>(Vacío)</span>;
  }

  return (
    <ul className="list-disc pl-4">
      {value.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

interface ObjectCellRendererProps extends ICellRendererParams {
  value: object;
}

const ObjectCellRenderer: React.FC<ObjectCellRendererProps> = (
  props: ObjectCellRendererProps
) => {
  const { value } = props;

  if (!value || typeof value !== "object") {
    return <span>(Sin datos)</span>;
  }

  return (
    <div className="p-2 bg-gray-100 rounded">
      {Object.entries(value).map(([key, val], index) => (
        <div key={index}>
          <strong>{key}:</strong>{" "}
          {typeof val === "object" ? JSON.stringify(val) : String(val)}
        </div>
      ))}
    </div>
  );
};

interface ArrayObjectCellRendererProps extends ICellRendererParams {
  value: object;
  fieldToShow: string;
  objectTag: string;
}

export const ArrayObjectCellRenderer: React.FC<ArrayObjectCellRendererProps> = (
  props: ArrayObjectCellRendererProps
) => {
  const { value, fieldToShow, objectTag } = props;

  if (!Array.isArray(value) || value.length === 0) {
    return <span>-</span>;
  }

  console.log(objectTag);
  console.log(fieldToShow);

  return (
    <ul>
      {value.map((item, index) => (
        <li key={index}>
          {item[objectTag][fieldToShow] || JSON.stringify(item)}
        </li>
      ))}
    </ul>
  );
};

interface ShowModalProps {
  show: boolean;
  onClose: () => void;
  modalData: Record<string, never>;
}

const ShowModal: React.FC<ShowModalProps> = (props: ShowModalProps) => {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>View modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>{renderFields(props.modalData)}</Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => props.onClose()}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Función recursiva para generar los campos del formulario
const renderFields = (data: Record<string, never>, prefix: string = "") => {
  return Object.entries(data).map(([key, value]) => {
    const fieldName = prefix ? `${prefix}.${key}` : key; // Para mostrar claves jerárquicas

    if (typeof value === "object" && value !== null && key !== "img") {
      // Si el valor es un objeto, renderizamos los subcampos recursivamente
      return (
        <div key={fieldName} className="mt-2">
          <h6>{fieldName}</h6>
          <div style={{ marginLeft: "20px" }}>
            {renderFields(value, fieldName)}{" "}
            {/* Llamada recursiva para subcampos */}
          </div>
        </div>
      );
    } else {
      // Si el valor no es un objeto, mostramos el campo de formulario
      return (
        <Form.Group key={fieldName} controlId={`form-${fieldName}`}>
          <Form.Label>{fieldName}</Form.Label>
          <Form.Control type="text" value={value} readOnly />
        </Form.Group>
      );
    }
  });
};

export default DynamicTable;
