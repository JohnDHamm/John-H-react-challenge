import Axios from "axios";
import { SIGN_UP_PATH } from "../constants/requestPaths";

const signUp = async (
  username: string,
  password: string
): Promise<UserInterface> => {
  return await Axios.get(
    `${SIGN_UP_PATH}?username=${username}&password=${password}`
  ).then((response): UserInterface => response.data);
};

export default signUp;
