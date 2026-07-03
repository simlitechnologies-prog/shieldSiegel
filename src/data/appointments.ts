import type { Appointment } from "@/types";
import appointmentsJson from "./appointments.json";

export const appointments: Appointment[] = appointmentsJson as Appointment[];
