import { useMutation } from "@tanstack/react-query";
import axios from "@/service/axiosInstance";
type ProductData = {
  imgLogo: any;
  imgProduct: string;
  name: string;
  imgListProduct: string[];
  product: string;
  x: number;
  y: number;
  angle: number;
};

const postProductData = async (data: ProductData) => {
  const res = await axios.post("product/create", data).then((res) => {
    return res;
  });

  return res;
};

export const useProduct = () => {
  return useMutation((data: ProductData) => postProductData(data), {});
};
