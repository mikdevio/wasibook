import React, { useState } from "react";
import { List } from "react-bootstrap-icons";
import { Container, Nav, Navbar } from "react-bootstrap";
import SidebarItem from "./SidebarItem";

import { SidebarDetails } from "../../types/Types";

interface SidebarProps {
  details: SidebarDetails;
}

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const { details } = props;
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
      style={open ? { width: "100%" } : { width: "22%" }}
    >
      <Navbar className="d-flex flex-column">
        <Nav defaultActiveKey="#" className="d-flex flex-column">
          <SidebarItem
            icon={<List />}
            name="Menu"
            hide={open}
            onClick={handleOpen}
          />
          {details.menus.map((item, i) => (
            <SidebarItem
              key={i}
              icon={item.icon}
              name={item.name}
              url={item.url}
              hide={open}
            />
          ))}
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Sidebar;
