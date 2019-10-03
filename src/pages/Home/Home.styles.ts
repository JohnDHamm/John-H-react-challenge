import styled from "styled-components";
import { Link } from "react-router-dom";

export const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Form = styled.form`
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 3rem;
  width: 250px;
`;

export const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  margin-top: 0;
`;

export const UsernameFormControl = styled.div`
  margin-bottom: 1rem;
`;
export const PasswordFormControl = styled.div`
  margin-bottom: ${(props: { formError: boolean }): string =>
    props.formError ? "1rem" : "2rem"};
`;

export const Input = styled.input`
  background-color: ${(props: { inputError: boolean }): string =>
    props.inputError ? "#FDF0EF" : "#f7f7f7"};
  border: ${(props: { inputError: boolean }): string =>
    props.inputError ? "1px solid #F4AFA7" : "1px solid #f7f7f7"};
  box-sizing: border-box;
  font-size: 1rem;
  padding: 0.5rem;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 300;
  margin-bottom: 0.25rem;
  margin-right: 1rem;
`;

export const Button = styled.button`
  background-color: #333;
  border: 0;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;

  &:hover {
    background-color: #555;
  }
`;

export const SignupMessage = styled.p`
  margin: 1rem 0;
  font-size: 1rem;
  color: #555;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  background-color: #333;
  border: 0;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;

  &:hover {
    background-color: #555;
  }
`;