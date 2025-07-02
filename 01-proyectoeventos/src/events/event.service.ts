import axios from "axios";
import type { Event } from "../types/Event";

const API = "http://localhost:4000/api/events";

export function getAllEvents() {
  return axios.get<Event[]>(API);
}

export function getEventById(id: string) {
  return axios.get<Event>(`${API}/${id}`);
}

export function createEvent(data: Omit<Event, "id">) {
  return axios.post<Event>(API, data);
}

export function updateEvent(id: string, data: Partial<Event>) {
  return axios.put<Event>(`${API}/${id}`, data);
}

export function deleteEvent(id: string) {
  return axios.delete(`${API}/${id}`);
}