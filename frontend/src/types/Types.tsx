import {
  Building,
  CalendarWeek,
  Coin,
  ColumnsGap,
  PersonFill,
  ReceiptCutoff,
} from "react-bootstrap-icons";

export type PriceData = {
  tag: string;
  value: number;
};

export type PricesDictionary = {
  [id: string]: PriceData;
};

export enum CheckType {
  IN = "in",
  OUT = "out",
}

export type CheckData = {
  type: CheckType;
  date: Date;
};

export type TaxData = {
  name: string;
  description: string;
  rate: number;
};

export interface RoomData {
  _id: string;
  code: string;
  roomType: "Single" | "Double" | "Suite" | "Deluxe";
  price: number;
  amenities: string[];
  description: string;
  availability: boolean;
  img: { data: { data: number[]; type: "Buffer" } };
  stars: number;
  taxes: TaxData[];
  createdAt?: string;
  updatedAt?: string;
}

export type RoomReservedData = {
  checkinData: CheckData;
  checkoutData: CheckData;
  roomData: RoomData;
};

export type BookingData = {
  reservationList: RoomReservedData[];
  pricesDictionary: PricesDictionary;
};

// Clases relacionadas con el backend
export type BkRoomReservationData = {
  room: string;
  checkInDate: Date;
  checkOutDate: Date;
};

export type BkReservationData = {
  user: string;
  rooms: BkRoomReservationData[];
  status: "unconfirmed" | "confirmed" | "abandoned" | "cancelled";
};

// Clases relacionadas con el frontend
export type FtReservationData = {
  _id: string;
  user: string;
  rooms: BkRoomReservationData[];
  status: "unconfirmed" | "confirmed" | "abandoned" | "cancelled";
};

export type FtInvoiceData = {
  _id: string;
  reservation: string;
  amount: number;
  issueDate: Date;
  dueDate: Date;
  status: "paid" | "unpaid" | "cancelled";
  details: string;
};

export enum StepState {
  INCOMPLETED,
  IN_PROCESS,
  COMPLETED,
}

export type StepData = {
  stepNumber: number;
  stepLabel: string;
  stepState: StepState;
};

export type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  img: { data: { data: number[]; type: "Buffer" } };
  phone: string;
  address: string;
  role: string;
};

export type CustomerData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  img: string; // mejorar tipo
  phone: string;
  address: string;
  taxNumber: string;
  reservations: RoomReservedData[];
};

export type FieldHeader = {
  tag: string;
  headerName: string;
};

export type FieldDetails = {
  fieldHeaders: FieldHeader[];
  fieldExcluded: string[];
};

export const UserFieldDetails: FieldDetails = {
  fieldHeaders: [
    {
      tag: "firstName",
      headerName: "Nombre",
    },
    {
      tag: "lastName",
      headerName: "Apellido",
    },
    {
      tag: "employeeId",
      headerName: "ID empleado",
    },
    {
      tag: "permisions",
      headerName: "Permisos",
    },
    {
      tag: "img",
      headerName: "Foto",
    },
    {
      tag: "email",
      headerName: "Email",
    },
    {
      tag: "email",
      headerName: "Email",
    },
    {
      tag: "phone",
      headerName: "Teléfono",
    },
    {
      tag: "address",
      headerName: "Dirección",
    },
  ],
  fieldExcluded: ["_id", "__t", "__v", "createdAt", "updatedAt"],
};

export const CustomerFieldDetails: FieldDetails = {
  fieldHeaders: [
    {
      tag: "firstName",
      headerName: "Nombre",
    },
    {
      tag: "lastName",
      headerName: "Apellido",
    },
    {
      tag: "img",
      headerName: "Foto",
    },
    {
      tag: "email",
      headerName: "Email",
    },
    {
      tag: "loyaltyPoints",
      headerName: "Puntos",
    },
    {
      tag: "phone",
      headerName: "Teléfono",
    },
    {
      tag: "address",
      headerName: "Dirección",
    },
    {
      tag: "taxNumber",
      headerName: "RUC",
    },
  ],
  fieldExcluded: [
    "_id",
    "__t",
    "__v",
    "reservations",
    "createdAt",
    "updatedAt",
    "role",
  ],
};

export const RoomFieldDetails: FieldDetails = {
  fieldHeaders: [
    {
      tag: "code",
      headerName: "Código",
    },
    {
      tag: "roomType",
      headerName: "Tipo",
    },
    {
      tag: "price",
      headerName: "Precio/Día",
    },
    {
      tag: "amenities",
      headerName: "Servicios",
    },
    {
      tag: "description",
      headerName: "Descripción",
    },
    {
      tag: "availability",
      headerName: "Disponibilidad",
    },
    {
      tag: "img",
      headerName: "Fotos",
    },
    {
      tag: "Taxes",
      headerName: "Impuestos",
    },
    {
      tag: "createdAt",
      headerName: "Creado",
    },
    {
      tag: "updatedAt",
      headerName: "Actualizado",
    },
  ],
  fieldExcluded: ["_id", "__t", "__v", "createdAt", "updatedAt"],
};

export const TaxFieldDetails: FieldDetails = {
  fieldHeaders: [
    {
      tag: "name",
      headerName: "Nombre",
    },
    {
      tag: "description",
      headerName: "Descripción",
    },
    {
      tag: "rate",
      headerName: "Ratio",
    },
  ],
  fieldExcluded: ["_id", "__t", "__v", "createdAt", "updatedAt"],
};

export type ReservationData = {
  user: string;
  rooms: RoomReservedData[];
  status: "unconfirmed" | "confirmed" | "abandoned" | "cancelled";
};

export const ReservationFieldDetails: FieldDetails = {
  fieldHeaders: [
    {
      tag: "user.firstName",
      headerName: "Nombres cliente",
    },
    {
      tag: "user.lastName",
      headerName: "Apellidos cliente",
    },
    {
      tag: "rooms.room.code",
      headerName: "Reservas",
    },
    {
      tag: "status",
      headerName: "Estado",
    },
  ],
  fieldExcluded: ["_id", "__t", "__v", "createdAt", "updatedAt"],
};

export type InvoiceData = {
  reservation: string;
  amount: number;
  issueDate: Date;
  dueDate: Date;
  status: "paid" | "unpaid" | "cancelled";
  details: string;
};

export const InvoiceDataDetails: FieldDetails = {
  fieldHeaders: [
    {
      tag: "reservation",
      headerName: "Reservación",
    },
    {
      tag: "amount",
      headerName: "Cantidad",
    },
    {
      tag: "issueDate",
      headerName: "Fecha de emisión",
    },
    {
      tag: "dueDate",
      headerName: "Fecha de vencimiento",
    },
    {
      tag: "status",
      headerName: "Estado",
    },
    {
      tag: "details",
      headerName: "Detalles",
    },
  ],
  fieldExcluded: ["_id", "__t", "__v", "createdAt", "updatedAt"],
};

export type SidebarItem = {
  icon: unknown;
  name: string;
  url: string;
};

export type SidebarDetails = {
  menus: SidebarItem[];
  props: [];
};

// Sidebar menu constructors
// Customer dashboard sidebar
export const AdminSidebarDetails: SidebarDetails = {
  menus: [
    {
      icon: <ColumnsGap />,
      name: "Dashboard",
      url: "/adminboard/mainboard",
    },
    {
      icon: <PersonFill />,
      name: "Personal",
      url: "/adminboard/personel",
    },
    {
      icon: <Building />,
      name: "Habitaciones",
      url: "/adminboard/room",
    },
    {
      icon: <CalendarWeek />,
      name: "Reservas",
      url: "/adminboard/reservation",
    },
    {
      icon: <Coin />,
      name: "Impuestos",
      url: "/adminboard/tax",
    },
    {
      icon: <ReceiptCutoff />,
      name: "Facturas",
      url: "/adminboard/invoice",
    },
  ],
  props: [],
};

// Admin dashboard sidebar
export const CustomerSidebarDetails: SidebarDetails = {
  menus: [
    {
      icon: <ColumnsGap />,
      name: "Reservar",
      url: "/customerboard/reserve",
    },
    {
      icon: <Building />,
      name: "Reservaciones",
      url: "/customerboard/reserves",
    },
    {
      icon: <PersonFill />,
      name: "Pefil",
      url: "/customerboard/profile",
    },
  ],
  props: [],
};
