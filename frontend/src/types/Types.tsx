

export type PriceData = {
    tag: string;
    value: number;
}

export type PricesDictionary = {
    [id: string]: PriceData
}

export type CheckData = {
    checkType: string;
    date: Date;
}

export type RoomData = {
    roomCode: string;
    description: string;
}

export type ReservationData = {
    checkinData: CheckData;
    checkoutData: CheckData;
    roomData: RoomData;
}
export type BookingData = {
    reservationList: ReservationData[];
    pricesDictionary: PricesDictionary;
}

export enum StepState {
    Incompleted,
    InProcess,
    Completed
}