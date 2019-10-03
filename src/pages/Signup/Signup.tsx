import React, { useState, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router";

const Signup: React.FC<RouteComponentProps & Testable> = ({
  testid = "Signup"
}) => {

  return (
    <div>Sign up page</div>
  );
};

export default Signup;
