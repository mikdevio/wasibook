import { RoomData } from "../types/Types";

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