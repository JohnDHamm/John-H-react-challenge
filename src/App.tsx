import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Appointments from "./pages/Appointments/Appointments";
import Signup from "./pages/Signup/Signup";
import { signIn, signUp } from "./api";
import Header from "./components/Header/Header";
import PageContainer from "./universalStyles/PageContainer";

export const UserContext = createContext<UserInterface | null>(null);

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loginInputValues, setLoginInputValues] = useState<
    { username: string; password: string } | undefined
  >();
  const [loginInputErrors, setLoginInputErrors] = useState(false);
  const [signupInputValues, setSignupInputValues] = useState<
    { username: string; password: string } | undefined
  >();
  const [signupInputErrors, setSignupInputErrors] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect((): void => {
    if (loginInputValues) {
      setLoading(true);

      signIn(loginInputValues.username, loginInputValues.password)
        .then(data => {
          setUser(data);
          setLoginInputErrors(false);
          setLoading(false);
        })
        .catch(e => {
          console.error(e);
          setLoginInputErrors(true);
          setLoading(false);
        });
    }
  }, [loginInputValues]);

  useEffect((): void => {
    if (signupInputValues) {
      setLoading(true);

      signUp(signupInputValues.username, signupInputValues.password)
        .then(data => {
          setUser(data);
          setSignupInputErrors(false);
          setLoading(false);
        })
        .catch(e => {
          console.error(e);
          setSignupInputErrors(true);
          setLoading(false);
        });
    }
  }, [signupInputValues]);

  if (loading) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={user}>
      <Router>
        <PageContainer>
          <Header />
          <Switch>
            <Route path="/appointments" component={Appointments} />
            <Route
              exact
              path="/signup"
              render={(props): JSX.Element => (
                <Signup
                  {...props}
                  signupSubmissionErrors={signupInputErrors}
                  onSignupFormSubmit={(values): void => {
                    setSignupInputValues(values);
                  }}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={(props): JSX.Element => (
                <Home
                  {...props}
                  loginSubmissionErrors={loginInputErrors}
                  onLoginFormSubmit={(values): void => {
                    setLoginInputValues(values);
                  }}
                />
              )}
            />
            
          </Switch>
        </PageContainer>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
