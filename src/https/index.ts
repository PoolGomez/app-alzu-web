import type { ApiResponse, Company } from "@/types/company";
import { axiosWrapper } from "./axiosWrapper";

export const login = (data)=> axiosWrapper.post("/api/user/login", data);
export const register = (data)=> axiosWrapper.post("/api/user/register", data);
export const getUserData = () => axiosWrapper.get("/api/user");
export const logout = () => axiosWrapper.post("/api/user/logout");

// Company Endpoints
export const addCompany = (data) => axiosWrapper.post("/api/company/", data);
export const getCompanies = (userId) => axiosWrapper.get(`/api/company/${userId}`);
export const getCompany = (companyId)=> axiosWrapper.get(`/api/company/get/${companyId}`);
// export const updateCompany = ({ companyId, ...companyData }) =>axiosWrapper.put(`/api/company/${companyId}`, companyData);
interface UpdateCompanyPayload {
  companyId: string;
  name: string;
  description: string;
}
export const updateCompany = async (
  // { companyId, ...companyData }
  payload: UpdateCompanyPayload
) :Promise<ApiResponse<Company>> =>{
  const {companyId, ...companyData} = payload;
  const res = await  axiosWrapper.put(`/api/company/${companyId}`, companyData);
  return res.data;
}

export const deleteCompany = (companyId) => axiosWrapper.delete(`/api/company/${companyId}`)