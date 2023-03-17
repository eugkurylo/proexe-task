import { RootState } from "..";

export const getNotificationsSelector = (state: RootState) =>
  state.notifications.notifications;
