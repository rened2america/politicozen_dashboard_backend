import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/service/axiosInstance";

const postUploadRequest = async (data: any) => {
  const res = await axios
    .post("politicozen/uploadRequest", data, {
      // TODO: Set this later to get image directly instead of URL 
      // headers: { 
      //   "Content-Type": "multipart/form-data",
      // },
    })
    .then((res) => {
      return res;
    });

  return res;
};

export const useUploadArt = () => {
  return useMutation((data: any) => postUploadRequest(data), {});
};

const getAllRequests = async () => {
  const res = await axios.get("politicozen/getAllRequests").then((res) => {
    return res;
  });
  console.log(res);
  return res;
};

export const useGetAllRequests = () => {
  return useQuery(["allRequests"], getAllRequests);
};
