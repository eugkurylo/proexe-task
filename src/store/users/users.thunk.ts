import { usersApi } from "@/service/api/users";
import { UserType } from "@/types/data.types";
import {
  createAsyncThunkWithErrorHandler,
  reduxSuccessNotification,
  reduxDeleteSuccessNotification,
} from "../helpers";

export const usersThunkName = "users";

export const refreshUsers = createAsyncThunkWithErrorHandler(
  `${usersThunkName}/refresh`,
  async (_, { dispatch }) => {
    dispatch(getUsers());
  }
);

export const getUsers = createAsyncThunkWithErrorHandler(
  `${usersThunkName}/getUsers`,
  async () => await usersApi.getList()
);

export const getUserById = createAsyncThunkWithErrorHandler(
  `${usersThunkName}/getUserById`,
  async (id: UserType["id"]) => await usersApi.getById(id)
);

export const postUser = createAsyncThunkWithErrorHandler(
  `${usersThunkName}/postUser`,
  async (user: Omit<UserType, "id">, { dispatch }) => {
    {
      await usersApi.post(user);
      dispatch(refreshUsers());
      return reduxSuccessNotification("User was successfully created");
    }
  }
);

export const putUser = createAsyncThunkWithErrorHandler(
  `${usersThunkName}/putUser`,
  async (user: UserType, { dispatch }) => {
    {
      await usersApi.put(user);
      dispatch(refreshUsers());
      return reduxSuccessNotification("User was successfully updated");
    }
  }
);

export const deleteUser = createAsyncThunkWithErrorHandler(
  `${usersThunkName}/deleteUser`,
  async (id: UserType["id"], { dispatch }) => {
    await usersApi.delete(id);
    dispatch(refreshUsers());
    return reduxDeleteSuccessNotification();
  }
);
