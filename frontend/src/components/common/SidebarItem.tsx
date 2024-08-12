import { ReactNode } from "react";
import { Nav } from "react-bootstrap";

interface SidebarItemProps {
  icon: ReactNode;
  name: string;
  url?: string;
  onClick?: () => void;
  hide?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = (props: SidebarItemProps) => {
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
export default SidebarItem;
