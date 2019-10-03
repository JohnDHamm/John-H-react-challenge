import styled from "styled-components";

export const AppointmentsContainer = styled.div`
  display: block;
  margin:  2rem auto;
  min-width: 514px;
`;

export const AppointmentsHeader = styled.h1``;

export const Appointment = styled.div`
  display: grid;
  grid-template-areas: "type date" "status status" "cost cost";
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: baseline;
  padding: 2rem;
  background-color: #f2f2f2;
  margin: 2rem 0;
  grid-row-gap: 0.5rem;
  width: 450px;
  border-radius: 5px;
`;

export const Text = styled.p`
  margin: 0;
`;

export const Type = styled(Text)`
  font-size: 1.5rem;
  font-weight: 700;
  grid-area: type;
`;

export const Status = styled(Text)`
  font-size: 1rem;
  grid-area: status;
`;

export const Date = styled(Text)`
  font-size: 1.25rem;
  font-weight: 700;
  grid-area: date;
`;

export const Cost = styled(Text)`
  font-size: 1rem;
  grid-area: cost;
`;
