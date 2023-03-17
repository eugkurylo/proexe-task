import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { useDispatch } from "react-redux";
import { notificationsSlice } from "./notifications";
import { usersSlice } from "./users";
import { notifyMiddleware } from "./middlewares/notifyMiddleware";

const logger = createLogger({
  collapsed: true,
});

export const store = configureStore({
  reducer: {
    notifications: notificationsSlice,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware().concat([notifyMiddleware]);

    return middlewares.concat(logger);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootStateKeys = keyof RootState;
export type RootReducer = typeof store;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
