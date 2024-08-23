import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { getUser } from "@/lib/actions/patient.actions";
import * as Sentry from "@sentry/nextjs";


const SuccessPage = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";

  const appointmentDocument = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointmentDocument.primaryPhysician
  );

  const user = await getUser(userId);
  Sentry.metrics.set("user_view_appointment-success", user.name);


  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="success"
            height={300}
            width={300}
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted
          </h2>
          <p>You will receive sms confirmation shortly</p>
        </section>

        <section className="request-details">
          <p>Request Details</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              height={100}
              width={100}
              alt={doctor?.name!}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{formatDateTime(appointmentDocument.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className="copyright">
          © {new Date().getFullYear()} MediBook. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
