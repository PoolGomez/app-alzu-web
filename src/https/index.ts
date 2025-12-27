import type { Company } from "@/types/company";
import { axiosWrapper } from "./axiosWrapper";
import type { ApiResponse } from "@/types/api-responsive";
import type { Room } from "@/types/room";
import type { Role } from "@/types/role";

export const login = (data)=> axiosWrapper.post("/api/user/login", data);
export const register = (data)=> axiosWrapper.post("/api/user/register", data);
export const getUserData = () => axiosWrapper.get("/api/user");
export const logout = () => axiosWrapper.post("/api/user/logout");

// Company Endpoints
export const addCompany = (data) => axiosWrapper.post("/api/company/", data);
export const getCompanies = (userId : string) => axiosWrapper.get(`/api/company/${userId}`);
export const getCompany = (companyId : string)=> axiosWrapper.get(`/api/company/get/${companyId}`);
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

export const deleteCompany = (companyId : string) => axiosWrapper.delete(`/api/company/${companyId}`);


// -------------  Table endpoints ------------------------
export const addTable = (newTable) => axiosWrapper.post("/api/table/", newTable);
export const getTables = () => axiosWrapper.get("/api/table");
export const updateTable = ({ tableId, ...tableData }) => axiosWrapper.put(`/api/table/${tableId}`, tableData);


// -------------  Room endpoints -------------------------
// export const addRoom = (data) => axiosWrapper.post("/api/room/", data);
export const addRoom = async (newRoom: Omit<Room, "_id">): Promise<ApiResponse<Room>> => {
  const res = await axiosWrapper.post("/api/room/", newRoom);
  return res.data
}
export const getRoomsAllByCompanyId = (companyId: string) => axiosWrapper.get(`/api/room/all/${companyId}`)
export const getRoomsVisiblesByCompanyId = (companyId: string) => axiosWrapper.get(`/api/room/visibles/${companyId}`)
export const getRoomById = (roomId: string) => axiosWrapper.get(`/api/room/${roomId}`)

// interface UpdateRoomPayLoad{
//   _id: string;
//   title: string;
//   visible: boolean;
// }
export const updateRoom = async (payload: Omit<Room, "companyId">): Promise<ApiResponse<Room>> => {
  const { _id, ...roomData} = payload;
  const res = await axiosWrapper.put(`/api/room/${_id}`, roomData)
  return res.data;
}
export const deleteRoom = (roomId: string)=> axiosWrapper.delete(`/api/room/${roomId}`)


// permisos Rol
export const addRole = async (newRole: Omit<Role, "_id">): Promise<ApiResponse<Role>>=>{
  const res = await axiosWrapper.post("/api/role/", newRole);
  return res.data;
}
export const getAllRolesByCompanyId = (companyId: string) => axiosWrapper.get(`/api/role/all-by-company-id/${companyId}`)

export const updateRole = async (payload: Omit<Role, "companyId">): Promise<ApiResponse<Role>> => {
  const {_id, ...roleData} = payload;
  const res = await axiosWrapper.put(`/api/role/${_id}`, roleData)
  return res.data;
}
export const deleteRole = (roleId: string)=>axiosWrapper.delete(`/api/role/${roleId}`)
