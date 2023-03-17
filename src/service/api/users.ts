import { API_PATH } from "@/constants/api";
import { UsersType, UserType } from "@/types/data.types";
import { ApiMethod } from "../constants";
import { request } from "../request";

const getList = async (): Promise<UsersType> => {
  return request(`${API_PATH.users}`, ApiMethod.GET);
};

const getById = async (id: number): Promise<UserType> => {
  return await request(`${API_PATH.users}/${id}`, ApiMethod.GET);
};

const post = async (user: Omit<UserType, "id">) => {
  return await request(API_PATH.users, ApiMethod.POST, user);
};

const put = async (user: UserType) => {
  return await request(`${API_PATH.users}/${user.id}`, ApiMethod.PUT, user);
};

const httpDelete = async (id: number) => {
  return await request(`${API_PATH.users}/${id}`, ApiMethod.DELETE);
};

export const usersApi = {
  getList,
  getById,
  post,
  put,
  delete: httpDelete,
};
