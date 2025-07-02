import axios from "axios";
import type { Event } from "../types/Event";
const API_URL = "http://localhost:4000/api/events";

export const getAllEvents = () => axios.get(API_URL);
export const getEventById = (id: string) => axios.get(`${API_URL}/${id}`);
export const createEvent = (data: Omit<Event, "id">) => axios.post(API_URL, data);
export const updateEvent = (id: string, data: Omit<Event, "id">) => axios.put(`${API_URL}/${id}`, data);
export const deleteEvent = (id: string) => axios.delete(`${API_URL}/${id}`);