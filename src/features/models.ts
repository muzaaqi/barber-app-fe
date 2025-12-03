import { BergasInstance } from "@/lib/axios-instance";

const getModels = async () => {
  const res = await BergasInstance.get("/haircut-models");
  console.log(res.data);
  return res.data.data;
};


const getModelById = async (id: string) => {
  const res = await BergasInstance.get(`/haircut-models/${id}`);
  return res.data.data;
}

export {getModels, getModelById}; 