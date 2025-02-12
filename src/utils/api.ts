import { User } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/?results=15`);
    return await response.json();
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
}
