export type PriceData = {
  tag: string;
  value: number;
};

export type PricesDictionary = {
  [id: string]: PriceData;
};

export type CheckData = {
  checkType: string;
  date: Date;
};

export type RoomData = {
  image: string;
  roomCode: string;
  stars: number;
  room: string;
  description: string;
  price: number;
};

export type ReservationData = {
  checkinData: CheckData;
  checkoutData: CheckData;
  roomData: RoomData;
};
export type BookingData = {
  reservationList: ReservationData[];
  pricesDictionary: PricesDictionary;
};

export enum StepState {
  Incompleted,
  InProcess,
  Completed,
}

export type StepData = {
  stepNumber: number;
  stepLabel: string;
  stepState: StepState;
};
