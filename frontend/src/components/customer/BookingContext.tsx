import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { BookingData, CheckType, RoomReservedData } from "../../types/Types";
import moment from "moment";
import { getStayLength } from "../../services/utils";

interface BookingContextType {
  bookingData: BookingData;
  addReservation: (reservation: RoomReservedData) => void;
  removeReservation: (roomId: string) => void;
  changeDateReservation: (
    roomId: string,
    checkType: CheckType,
    newDate: Date
  ) => void;
  updatePriceDictionary: () => void;
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
  const [bookingData, setBookingData] = useState<BookingData>({
    reservationList: [],
    pricesDictionary: {},
  });

  const addReservation = (reservation: RoomReservedData) => {
    setBookingData((prevBookingData) => {
      return {
        ...prevBookingData,
        reservationList: [...prevBookingData.reservationList, reservation],
      };
    });
  };

  const removeReservation = (roomId: string) => {
    setBookingData({
      ...bookingData,
      reservationList: bookingData.reservationList.filter(
        (roomReserved) => roomReserved.roomData._id !== roomId
      ),
    });
  };

  const updatePriceDictionary = () => {
    setBookingData((prevBookingData) => {
      return {
        ...prevBookingData,
        pricesDictionary: calculatePriceDictionary(
          prevBookingData.reservationList
        ),
      };
    });
  };

  useEffect(() => {
    updatePriceDictionary();
  }, [bookingData.reservationList]); //FIXME: Corrige esta advertencia

  const changeDateReservation = (
    roomId: string,
    checkType: CheckType,
    newDate: Date
  ) => {
    const newDateObj = moment.isMoment(newDate) ? newDate.toDate() : newDate;

    setBookingData((prevBookingData) => ({
      ...prevBookingData,
      reservationList: prevBookingData.reservationList.map((roomReserved) => {
        if (roomReserved.roomData._id === roomId) {
          let checkinDate = roomReserved.checkinData.date;
          let checkoutDate = roomReserved.checkoutData.date;

          if (checkType === CheckType.IN) {
            checkinDate = newDateObj;
            if (moment(checkinDate).isAfter(moment(checkoutDate))) {
              checkoutDate = checkinDate;
            }
          } else {
            checkoutDate = newDateObj;
            if (moment(checkoutDate).isBefore(moment(checkinDate))) {
              checkinDate = checkoutDate;
            }
          }

          return {
            ...roomReserved,
            checkinData: {
              ...roomReserved.checkinData,
              date: checkinDate,
            },
            checkoutData: {
              ...roomReserved.checkoutData,
              date: checkoutDate,
            },
          };
        }
        return roomReserved;
      }),
    }));
  };

  const calculatePriceDictionary = (reservationList: RoomReservedData[]) => {
    const subTotal = reservationList.reduce((total, reservation) => {
      const stayLength = getStayLength(
        reservation.checkinData.date,
        reservation.checkoutData.date
      );
      return total + reservation.roomData.price * stayLength;
    }, 0);

    const taxNames = [
      ...new Set(
        reservationList.flatMap((reservation) =>
          reservation.roomData.taxes.map((tax) => tax.name)
        )
      ),
    ];

    const taxArray = taxNames.map((taxName) => {
      return {
        [taxName]: {
          tag: taxName,
          value: reservationList.reduce((total, reservation) => {
            const taxAmount = reservation.roomData.taxes
              .filter((tax) => tax.name === taxName)
              .reduce((sum, tax) => {
                const stayLength = getStayLength(
                  reservation.checkinData.date,
                  reservation.checkoutData.date
                );
                return sum + tax.rate * reservation.roomData.price * stayLength;
              }, 0);
            return total + taxAmount;
          }, 0),
        },
      };
    });

    let pricesDict = {
      subtotal: { tag: "Subtotal", value: subTotal },
    };

    pricesDict = { ...pricesDict };

    taxArray.forEach((taxObj) => {
      Object.assign(pricesDict, taxObj);
    });

    let total = 0;
    for (const [key, price] of Object.entries(pricesDict)) {
      if (key !== "total") {
        total += price.value;
      }
    }

    Object.assign(pricesDict, { total: { tag: "Total", value: total } });

    return pricesDict;
  };

  return (
    <ReservationContext.Provider
      value={{
        bookingData: bookingData,
        addReservation,
        removeReservation,
        changeDateReservation,
        updatePriceDictionary,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
