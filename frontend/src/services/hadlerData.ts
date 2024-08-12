import {
  CustomerData,
  InvoiceData,
  ReservationData,
  RoomData,
  TaxData,
  UserData,
} from "../types/Types";

export const roomGetAll = async (): Promise<RoomData[]> => {
  try {
    const response = await fetch("http://localhost:3000/room/all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    // console.log(data);

    if (response.ok) {
      return data.data as RoomData[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error while getting data from server:", error);
    return [];
  }
};

export const userGetAll = async (): Promise<UserData[]> => {
  try {
    const response = await fetch("http://localhost:3000/user/all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data.data as UserData[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error while getting data from server:", error);
    return [];
  }
};

export const customerGetAll = async (): Promise<CustomerData[]> => {
  try {
    const response = await fetch("http://localhost:3000/customer/all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data.data as CustomerData[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error while getting data from server:", error);
    return [];
  }
};

export const taxesGetAll = async (): Promise<TaxData[]> => {
  try {
    const response = await fetch("http://localhost:3000/tax/all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data.data as TaxData[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error while getting data from server:", error);
    return [];
  }
};

export const reservationGetAll = async (): Promise<ReservationData[]> => {
  try {
    const response = await fetch("http://localhost:3000/reservation/all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data.data as ReservationData[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error while getting data from server:", error);
    return [];
  }
};

export const invoiceGetAll = async (): Promise<InvoiceData[]> => {
  try {
    const response = await fetch("http://localhost:3000/invoice/all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data.data as InvoiceData[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error while getting data from server:", error);
    return [];
  }
};
