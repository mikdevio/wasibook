import React, { ReactNode, useState } from "react";
import {
  Building,
  CalendarWeek,
  Coin,
  List,
  PersonFill,
  ReceiptCutoff,
} from "react-bootstrap-icons";
import { Container, Nav, Navbar } from "react-bootstrap";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    if (open) {
      // console.log("Activar");
      setOpen(false);
    } else {
      // console.log("Desactivar");
      setOpen(true);
    }
  };

  return (
    <Container
      className="d-flex text-bg-dark vh-100 ps-2 text-white ms-0"
      style={open ? { width: "200px" } : { width: "55px" }}
    >
      <Navbar className="d-flex flex-column">
        <Nav defaultActiveKey="#" className="d-flex flex-column">
          <SidebarItem
            icon={<List />}
            name="Menu"
            hide={open}
            url="#"
            onClick={handleOpen}
          />
          <SidebarItem
            icon={<PersonFill />}
            name="Personal"
            url="#"
            hide={open}
          />
          <SidebarItem
            icon={<Building />}
            name="Habitaciones"
            url="#"
            hide={open}
          />
          <SidebarItem
            icon={<CalendarWeek />}
            name="Reservas"
            url="#"
            hide={open}
          />
          <SidebarItem icon={<Coin />} name="Impuestos" url="#" hide={open} />
          <SidebarItem
            icon={<ReceiptCutoff />}
            name="Facturas"
            url="#"
            hide={open}
          />
        </Nav>
      </Navbar>
    </Container>
  );
};

interface SidebarMenuItemProps {
  icon: ReactNode;
  name: string;
  url: string;
  onClick?: () => void;
  hide?: boolean;
}

const SidebarItem: React.FC<SidebarMenuItemProps> = (
  props: SidebarMenuItemProps
) => {
  const { icon, name, url, hide, onClick } = props;

  return (
    <>
      <Nav.Item>
        <Nav.Link href={url} className="text-white pe-1" onClick={onClick}>
          {icon}
          <span className="ps-3" style={{ display: hide ? "inline" : "none" }}>
            {name}
          </span>
        </Nav.Link>
      </Nav.Item>
    </>
  );
};

export default Sidebar;
