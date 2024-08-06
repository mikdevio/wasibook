import React, { useEffect, useState } from "react";

import {
  BookingData,
  PricesDictionary,
  CheckData,
  RoomData,
  RoomReservedData,
  StepState,
  CheckType,
} from "./../types/Types";
import CustomerBoard from "../components/customer/CustomerBoard";
import { useAuth } from "../components/common/AuthContext";
import AdminBoard from "../components/admin/AdminBoard";
import { roomGetAll } from "../services/hadlerData";

const checkIn: CheckData = {
  type: CheckType.IN,
  date: new Date("2022-05-22T16:00:00"),
};

const checkOut: CheckData = {
  type: CheckType.OUT,
  date: new Date("2022-05-25T11:00:00"),
};

const roomOne: RoomData = {
  img: { type: "url/img/1.jpeg", data: [] },
  code: "A001",
  stars: 4,
  roomType: "Suite",
  price: 12.5,
  description: "King bed stylish Apartment with Loft style family room",
  availability: true,
  amenities: [],
};

const roomTwo: RoomData = {
  img: { type: "url/img/2.jpeg", data: [] },
  code: "A002",
  stars: 3,
  roomType: "Single",
  price: 25.5,
  description: "King bed stylish Apartment with Loft style family room",
  availability: true,
  amenities: [],
};

const Prices: PricesDictionary = {
  id_1: {
    tag: "Rooms and offer:",
    value: 625.43,
  },
  id_2: {
    tag: "8% VAT:",
    value: 50.03,
  },
  id_3: {
    tag: "City tax:",
    value: 16.44,
  },
  id_4: {
    tag: "Total Price:",
    value: 698.87,
  },
};

const reservationOne: RoomReservedData = {
  checkinData: checkIn,
  checkoutData: checkOut,
  roomData: roomOne,
};

const reservationTwo: RoomReservedData = {
  checkinData: checkIn,
  checkoutData: checkOut,
  roomData: roomTwo,
};

const BookingExample: BookingData = {
  reservationList: [reservationOne, reservationTwo],
  pricesDictionary: Prices,
};

const steps = [
  {
    stepNumber: 1,
    stepLabel: "Dates & Rooms",
    stepState: StepState.IN_PROCESS,
  },
  { stepNumber: 2, stepLabel: "Extras", stepState: StepState.INCOMPLETED },
  { stepNumber: 3, stepLabel: "Payment", stepState: StepState.INCOMPLETED },
  {
    stepNumber: 4,
    stepLabel: "Confirmation",
    stepState: StepState.INCOMPLETED,
  },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<RoomData[]>([]);
  console.log(user);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsData = await roomGetAll();
      setRooms(roomsData);
    };

    fetchRooms();
  }, []);

  return (
    <>
      {user.role !== "admin" && (
        <CustomerBoard
          rooms={rooms}
          bookingData={BookingExample}
          steps={steps}
        />
      )}
      {user.role === "admin" && (
        <AdminBoard rooms={rooms} bookingData={BookingExample} steps={steps} />
      )}
    </>
  );
};

export default Dashboard;
