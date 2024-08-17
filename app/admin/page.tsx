
import React from "react";
import Image from "next/image";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import { getAppointmentsData } from "@/lib/actions/appointment.actions";
import {DataTable} from "@/components/Table/DataTable";
import {columns} from "@/components/Table/columns";


const AdminPage = async() => {
  const appointments = await getAppointmentsData();
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome </h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            label="Scheduled Appointments"
            count={appointments.scheduledCount}
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            label="Pending Appointments"
            count={appointments.pendingCount}
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            label="Cancelled Appointments"
            count={appointments.cancelledCount}
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable data={appointments.document} columns ={columns}/>
      </main>
    </div>
  );
};

export default AdminPage;
