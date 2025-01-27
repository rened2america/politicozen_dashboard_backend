import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const postCreateArtFromRequest = async (data: any) => {
  const res = await axios
    .post("product/createGroupFromRequest", data, {})
    .then((res) => {
      return res;
    });

  return res;
};

const putUploadRequest = async (data: any) => {
  const res = await axios
    .put("politicozen/updateRequest", data, {
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

const deleteRequest = async (requestID: number) => {
  const res = await axios
    .delete(`politicozen/deleteRequest/${requestID}`)
    .then((res) => {
      return res;
    });

  return res;
};

export const useUploadRequest = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => postUploadRequest(data), {
    ...options,
    onSuccess: async (response, variables, context) => {
      // Invalidate and refetch the requests query after successful deletion
      await queryClient.invalidateQueries(["allRequests"]);
      
      // Call the original onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
  });
};

export const useUpdateRequest = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => putUploadRequest(data), {
    ...options,
    onSuccess: async (response, variables, context) => {
      // Invalidate and refetch the requests query after successful deletion
      await queryClient.invalidateQueries(["allRequests"]);
      
      // Call the original onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
  });
};

export const useDeleteRequest = (options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation((requestID: number) => deleteRequest(requestID), {
    ...options,
    onSuccess: async (response, variables, context) => {
      // Invalidate and refetch the requests query after successful deletion
      await queryClient.invalidateQueries(["allRequests"]);
      
      // Call the original onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
  });
};

const getAllRequests = async () => {
  const res = await axios.get("politicozen/getAllRequests").then((res) => {
    return res;
  });
  console.log(res);
  return res;
};

export const useCreateArtFromRequest = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => postCreateArtFromRequest(data), {
    ...options,
    onSuccess: async (response, variables, context) => {
      // Invalidate and refetch the requests query after successful deletion
      await queryClient.invalidateQueries(["allRequests"]);
      
      // Call the original onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
  });
};

export const useGetAllRequests = () => {
  return useQuery(["allRequests"], getAllRequests);
};
