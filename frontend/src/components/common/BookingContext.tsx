import React, { createContext, useContext, useState, ReactNode } from "react";

interface RoomReservation {
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  price: number;
  taxes: number;
}

interface BookingContextType {
  reservations: RoomReservation[];
  addReservation: (reservation: RoomReservation) => void;
  removeReservation: (roomId: string) => void;
  calculateTotal: () => number;
}

const ReservationContext = createContext<BookingContextType | undefined>(
  undefined
);

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
};

export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [reservations, setReservations] = useState<RoomReservation[]>([]);

  const addReservation = (reservation: RoomReservation) => {
    setReservations([...reservations, reservation]);
  };

  const removeReservation = (roomId: string) => {
    setReservations(
      reservations.filter((reservation) => reservation.roomId !== roomId)
    );
  };

  const calculateTotal = () => {
    return reservations.reduce((total, reservation) => {
      return total + reservation.price + reservation.taxes;
    }, 0);
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        addReservation,
        removeReservation,
        calculateTotal,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
