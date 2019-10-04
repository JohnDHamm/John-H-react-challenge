import signUp from "./signUp";
import Axios from "axios";
import { SIGN_UP_PATH } from "../constants/requestPaths";

describe("signUp()", (): void => {
  it("should post to the sign up api path", (): void => {
    const axiosGet = jest.fn();
    Axios.get = axiosGet;

    signUp("test", "test");

    expect(axiosGet).toHaveBeenCalled();
    expect(axiosGet).toHaveBeenCalledWith(
      `${SIGN_UP_PATH}?username=test&password=test`
    );
  });

  it("should return a promise", (): void => {
    expect(signUp("test", "test")).toEqual(expect.any(Promise));
  });
});
