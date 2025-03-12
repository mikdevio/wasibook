import {
  BkReservationData,
  CustomerData,
  FtInvoiceData,
  FtReservationData,
  Invoice,
  InvoiceData,
  ReservationData,
  RoomData,
  TaxData,
  UserData,
} from "../types/Types";
import { transformInvoiceData } from "./utils";

export const roomGetAll = async (): Promise<RoomData[]> => {
  try {
    const populateOptions = { path: "taxes" };
    const queryParam = populateOptions
      ? `?populateOptions=${encodeURIComponent(
          JSON.stringify(populateOptions)
        )}`
      : "";

    const response = await fetch(
      `http://localhost:3000/room/all${queryParam}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    // console.log(data);

    if (response.ok) {
      return data.data as RoomData[];
    } else {
      console.log("Se ejecuta esto en ROOMS");
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
    const populateOptions = [
      { path: "user", select: "firstName lastName" },
      { path: "rooms.room", select: "code" },
    ];
    const queryParam = populateOptions
      ? `?populateOptions=${encodeURIComponent(
          JSON.stringify(populateOptions)
        )}`
      : "";

    const response = await fetch(
      `http://localhost:3000/reservation/all${queryParam}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

export const reservationCreate = async (
  reservation: BkReservationData
): Promise<FtReservationData | undefined> => {
  try {
    const response = await fetch("http://localhost:3000/reservation/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });

    const data = await response.json();

    if (response.ok) {
      return data.data as FtReservationData;
    } else {
      return {
        _id: "0",
        rooms: [],
        user: "0",
        status: "unconfirmed",
      };
    }
  } catch (error) {
    console.error("Error while sending data to the server:", error);
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

export const invoiceCreate = async (
  invoiceData: InvoiceData
): Promise<FtInvoiceData | undefined> => {
  try {
    const response = await fetch("http://localhost:3000/invoice/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });

    const data = await response.json();

    if (response.ok) {
      return data.data as FtInvoiceData;
    } else {
      const zeroInvoice: FtInvoiceData = {
        _id: "",
        amount: 0,
        issueDate: new Date(),
        dueDate: new Date(),
        status: "unpaid",
        details: "",
        reservation: "",
      };
      return zeroInvoice;
    }
  } catch (error) {
    console.error("Error while sending data to the server:", error);
  }
};

export const invoiceGetById = async (
  invoiceId: string
): Promise<Invoice | undefined> => {
  try {
    const populateOptions = [
      {
        path: "reservation",
        select: "createdAt updatedAt status", // Puedes seleccionar otros campos según necesites
        populate: [
          {
            path: "user",
            select: "firstName lastName email phone address taxNumber",
          },
          {
            path: "rooms",
            select: "checkInDate checkOutDate",
            populate: {
              path: "room", // Anidado dentro de reservation
              select: "code price roomType taxes",
              populate: {
                path: "taxes",
                select: "name rate",
              },
            },
          },
        ],
      },
    ];

    const queryParam = populateOptions
      ? `?populateOptions=${encodeURIComponent(
          JSON.stringify(populateOptions)
        )}`
      : "";

    const response = await fetch(
      `http://localhost:3000/invoice/${invoiceId}${queryParam}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);

    const invoiceConverted = transformInvoiceData(data.data);
    // console.log("InvoiceData converted", invoiceConverted);

    if (response.ok || !data.data) {
      return invoiceConverted;
    } else {
      console.log("Se ejecuta esta parte");
      const zeroInvoice: Invoice = {
        id: "",
        invoiceNumber: "",
        invoiceAuthNumber: "",
        customerTaxNumber: "",
        customerName: "",
        customerEmail: "",
        customerAddress: "",
        customerPhoneNumber: "",
        companyTaxNumber: "",
        companyName: "",
        companyAddress: "",
        companyEmail: "",
        companyPhoneNumber: "",
        items: [],
        date: new Date().toISOString(),
        taxRate: 0,
      };
      return zeroInvoice;
    }
  } catch (error) {
    console.error("Error while getting data from the server:", error);
  }
};
