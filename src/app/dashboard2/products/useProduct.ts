import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "@/service/axiosInstance";

const getProductsData = async () => {
  const res = await axios.get("product/allByUser").then((res) => {
    return res;
  });
  console.log(res);
  return res;
};

export const useGetProducts = () => {
  return useQuery(["products"], getProductsData);
};

const getProductByIdData = async (productId: string) => {
  const res = await axios.get(`product/${productId}`).then((res) => {
    return res;
  });
  console.log(res);
  return res;
};

export const useGetProduct = (productId: string) => {
  return useQuery(["product"], () => getProductByIdData(productId));
};

const updateProductData = async (product: any) => {
  const res = await axios.put("product/", product).then((res) => {
    return res;
  });

  return res;
};

export const useUpdateProduct = () => {
  return useMutation((product: any) => updateProductData(product), {});
};

const deleteProductData = async (product: any) => {
  console.log(product);
  const res = await axios.delete(`product/${product}`).then((res) => {
    return res;
  });

  return res;
};

export const useDeleteProduct = () => {
  return useMutation((product: any) => deleteProductData(product), {});
};
