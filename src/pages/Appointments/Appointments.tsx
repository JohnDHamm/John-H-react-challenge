import React, { useState, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { UserContext } from "../../App";
import { getUserAppointments } from "../../api";
import {
  AppointmentsContainer,
  AppointmentsHeader,
  Cost,
  Type,
  Date,
  Status,
  Appointment
} from "./Appointments.styles";
import { format } from "date-fns";
import { subTestidInit } from "../../utils";
import Filters from "../../components/Filters/Filters";

const Appointments: React.FC<RouteComponentProps & Testable> = ({
  testid = "Appointments"
}) => {
  const subTestid = subTestidInit(testid);
  const [appointments, setAppointments] = useState<
    AppointmentCollection | undefined
  >();
  const [user, setUser] = useState<UserInterface | undefined>();
  const [activeFilters, setActiveFilters] = useState(['pending', 'approved', 'in progress', 'finalized'])
  const [filteredAppointments, setFilteredAppointments] = useState<
    AppointmentCollection | undefined>();

  useEffect((): void => {
    if (user)
      getUserAppointments(user.id)
        .then((data): void => {
          setAppointments(data);
        })
        .catch(e => console.error(e));
  }, [user]);

  useEffect((): void => {
    filterAppointments();
  });

  const updateFilters = (selection: string) => {
    let newFilters: Array<string> = [...activeFilters];
    if (activeFilters.includes(selection)) {
      newFilters.splice(newFilters.indexOf(selection), 1);
    } else {
      newFilters.push(selection);
    }
    setActiveFilters(newFilters);
  }

  const filterAppointments = () => {
    if (appointments) {
      const filteredAppts = [...appointments].filter(
        appt => activeFilters.includes(appt.status));
      setFilteredAppointments(filteredAppts)
    }
  }

  return (
    <AppointmentsContainer data-testid={testid}>
      <AppointmentsHeader>Your Appointments</AppointmentsHeader>
      {activeFilters &&
        <Filters
          activeFilters={activeFilters}
          onChange={(selection: string) => updateFilters(selection)}
          />
      }
      <UserContext.Consumer>
        {(userData): JSX.Element[] | JSX.Element => {
          if (!userData) return <Redirect to="/" />;
          if (!user) setUser(userData);

          if (filteredAppointments)
            return filteredAppointments.map(
              (appointment): JSX.Element => (
                <Appointment data-testid={subTestid("Appointment")} key={appointment.id}>
                  <Type>Type: {appointment.chore}</Type>
                  <Date>{format(appointment.date, "Do MMMM YYYY")}</Date>
                  <Status>
                    <strong>Status:</strong> {appointment.status}
                  </Status>
                  <Cost>${appointment.cost}</Cost>
                </Appointment>
              )
            );

          return <div>Loading...</div>;
        }}
      </UserContext.Consumer>
    </AppointmentsContainer>
  );
};

export default Appointments;
