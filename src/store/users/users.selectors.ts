import { UserType } from "@/types/data.types";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const getUsersDataSelector = (state: RootState) => state.users.users;

export const isUSersLoadingSelector = (state: RootState) =>
  state.users.isLoading;

export const getUsersErrorSelector = (state: RootState) => state.users.error;

export const getUsersSortTypeSelector = (state: RootState) =>
  state.users.sortMethod;

export const getUserByIdSelector = (id: UserType["id"]) =>
  createSelector(getUsersDataSelector, (data) =>
    data?.find((user: UserType) => user.id === id)
  );

export const getUsersSelector = createSelector(
  getUsersDataSelector,
  isUSersLoadingSelector,
  getUsersErrorSelector,
  getUsersSortTypeSelector,
  (data, isLoading, error, sortMethod) => ({
    data,
    isLoading,
    error,
    sortMethod,
  })
);
