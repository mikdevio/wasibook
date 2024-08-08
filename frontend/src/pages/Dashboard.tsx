import React, { useEffect, useState } from "react";

import { RoomData, StepState } from "./../types/Types";
import { roomGetAll } from "../services/hadlerData";
import AdminBoard from "../components/admin/AdminBoard";
import { useAuth } from "../components/common/AuthContext";
import CustomerBoard from "../components/customer/CustomerBoard";
import { ReservationProvider } from "../components/common/BookingContext";

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
  // console.log(user);

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
        <ReservationProvider>
          <CustomerBoard
            user={user}
            rooms={rooms}
            bookingData={undefined}
            steps={steps}
          />
        </ReservationProvider>
      )}
      {user.role === "admin" && (
        <AdminBoard
          user={user}
          rooms={rooms}
          bookingData={undefined}
          steps={steps}
        />
      )}
    </>
  );
};

export default Dashboard;
