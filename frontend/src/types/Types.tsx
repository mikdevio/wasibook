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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  img: String; // mejorar tipo
  phone: string;
  address: string;
  taxNumber: string;
  reservations: RoomReservedData[];
};
