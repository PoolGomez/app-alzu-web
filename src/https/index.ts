import { axiosWrapper } from "./axiosWrapper";

export const login = (data)=> axiosWrapper.post("/api/user/login", data);
export const register = (data)=> axiosWrapper.post("/api/user/register", data);