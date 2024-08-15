'use server';

import { Appointment } from "@/types/appwrite.types";
import  {databases,DATABASE_ID, APPOINTMENT_COLLECTION_ID,} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Query,ID } from "node-appwrite";

export const createAppointment = async(appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
          DATABASE_ID!,
          APPOINTMENT_COLLECTION_ID!,
          ID.unique(),
          appointment
        );
        return parseStringify(newAppointment);
    } catch (error) {
        console.log(error)
    }
}

export const getAppointment = async(appointmentId : string) => {
    try {
        const appointment = await databases.getDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, appointmentId);
        return parseStringify(appointment);
    } catch (error) {
        console.log(error)
    }
}

export const getAppointmentsData = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      cancelledCount: 0,
      pendingCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            return {
              ...acc,
              scheduledCount: acc.scheduledCount + 1,
            };
          case "cancelled":
            return {
              ...acc,
              cancelledCount: acc.cancelledCount + 1,
            };
          case "pending":
            return {
              ...acc,
              pendingCount: acc.pendingCount + 1,
            };
          default:
            return acc;
        }
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      document: appointments.documents
    };

    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};