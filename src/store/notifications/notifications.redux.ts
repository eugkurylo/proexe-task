import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VariantType } from "notistack";
import { v4 } from "uuid";

export type Notification = {
  message: string;
  key: string;
  variant: VariantType;
};

export type NotificationsState = {
  notifications: Notification[];
};

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    sendNotification: {
      reducer: (state, action: PayloadAction<Notification>) => {
        const notification = action.payload;
        state.notifications = [...state.notifications, notification];
      },
      prepare: (payload: Omit<Notification, "key">) => {
        return { payload: { ...payload, key: v4() } };
      },
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.key !== action.payload
      );
    },
  },
});

export const { sendNotification, removeNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
