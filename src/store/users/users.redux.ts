import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { UsersType } from "@/types/data.types";
import { ApiError } from "next/dist/server/api-utils";
import {
  deleteUser,
  getUserById,
  getUsers,
  postUser,
  putUser,
} from "./users.thunk";
import { getSliceDataById } from "../helpers";
import { SortMethod } from "@/types/common.types";

export type UsersState = {
  isLoading: boolean;
  users?: UsersType;
  sortMethod?: SortMethod;
  error?: Error | ApiError;
};

const initialState: UsersState = {
  isLoading: false,
  sortMethod: SortMethod.ASC,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    sortUsers: (state) => {
      state.users = state.users?.sort((a, b) => {
        return state.sortMethod === SortMethod.ASC
          ? a.username.toLowerCase() < b.username.toLowerCase()
            ? -1
            : 1
          : a.username.toLowerCase() > b.username.toLowerCase()
          ? -1
          : 1;
      });
      state.sortMethod =
        state.sortMethod === SortMethod.ASC ? SortMethod.DESC : SortMethod.ASC;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addCase(getUserById.fulfilled, (state, { payload }) => {
        state.users = getSliceDataById(state.users, payload);
      })

      .addMatcher(
        isAnyOf(
          getUsers.pending,
          postUser.pending,
          putUser.pending,
          deleteUser.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getUsers.fulfilled,
          postUser.fulfilled,
          putUser.fulfilled,
          deleteUser.fulfilled,

          getUsers.rejected,
          postUser.rejected,
          putUser.rejected,
          deleteUser.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getUsers.rejected,
          postUser.rejected,
          putUser.rejected,
          deleteUser.rejected
        ),
        (state, action) => {
          state.error = (action.payload ? action.payload : action.error) as
            | Error
            | ApiError;
        }
      ),
});

export const { sortUsers } = usersSlice.actions;

export default usersSlice.reducer;
