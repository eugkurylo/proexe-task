import { Notification } from "./notifications";

import {
  AsyncThunkPayloadCreator,
  AsyncThunkOptions,
  AsyncThunk,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { ResultType } from "@/types/common.types";

export const createAsyncThunkWithErrorHandler = <Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, {}>,
  options?: AsyncThunkOptions<ThunkArg, {}>
): AsyncThunk<Returned, ThunkArg, {}> =>
  createAsyncThunk(
    typePrefix,
    async (params, thunkApi) => {
      try {
        return await payloadCreator(params, thunkApi);
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    },
    options
  ) as AsyncThunk<Returned, ThunkArg, {}>;

export const reduxDeleteSuccessNotification = (): {
  notification: Omit<Notification, "key">;
} => reduxSuccessNotification("Item has been deleted");

export const reduxSuccessNotification = (
  message: string
): { notification: Omit<Notification, "key"> } => ({
  notification: {
    message,
    variant: "success",
  },
});

export const getSliceDataById = <Model extends { id: unknown }>(
  slice: ResultType<Model> | undefined,
  value: Model
) => {
  if (slice) {
    if (slice.find((d) => d.id === value.id)) {
      slice.map((d) => (d.id === value.id ? value : d));
    } else {
      slice.push(value);
    }
  }
  return slice as ResultType<Model>;
};
