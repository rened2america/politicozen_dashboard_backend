import { useMutation } from "@tanstack/react-query";
import axios from "../../../service/axiosInstance";

type LoginData = {
 loginToken: String
};

const postLoginToken = async (data: LoginData) => {
  const res = await axios.post("auth/loginUrl", data).then((res) => {
    return res;
  });

  return res;
};

export const useUserLogin = () => {
  return useMutation((data: LoginData) => postLoginToken(data), {});
};