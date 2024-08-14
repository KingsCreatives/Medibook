'use server';

import { ID } from "node-appwrite";
import  {DATABASE_ID, APPOINTMENT_COLLECTION_ID,} from "../appwrite.config";
import { parseStringify } from "../utils";
import {databases} from "../appwrite.config";

export const createAppointment = async(appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
          DATABASE_ID!,
          APPOINTMENT_COLLECTION_ID!,
          ID.unique(),
          appointment
        );

        console.log(newAppointment)

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