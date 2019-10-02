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
import FilterButton from "../../components/FilterButton/FilterButton";

const Appointments: React.FC<RouteComponentProps & Testable> = ({
  testid = "Appointments"
}) => {
  const [appointments, setAppointments] = useState<
    AppointmentCollection | undefined
  >();
  const [user, setUser] = useState<UserInterface | undefined>();

  useEffect((): void => {
    if (user)
      getUserAppointments(user.id)
        .then((data): void => {
          setAppointments(data);
        })
        .catch(e => console.error(e));
  }, [user]);

  return (
    <AppointmentsContainer>
      <AppointmentsHeader>Your Appointments</AppointmentsHeader>
      <FilterButton selected={true} label={'pending'} />
      <FilterButton selected={false} label={'approved'} />
      <FilterButton selected={true} label={'in progress'} />
      <FilterButton selected={false} label={'finalized'} />
      <UserContext.Consumer>
        {(userData): JSX.Element[] | JSX.Element => {
          if (!userData) return <Redirect to="/" />;
          if (!user) setUser(userData);

          if (appointments)
            return appointments.map(
              (appointment): JSX.Element => (
                <Appointment key={appointment.id}>
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
