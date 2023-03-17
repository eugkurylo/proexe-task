import { Middleware } from "redux";
import { sendNotification } from "../notifications";

export const notifyMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type.endsWith("/rejected")) {
    if (action.payload) {
      const { message, title } = action.payload;
      if (message && title) {
        store.dispatch(
          sendNotification({
            message: `${title}: ${message}`,
            variant: "error",
          })
        );
      } else if (message && !title) {
        store.dispatch(sendNotification({ message, variant: "error" }));
      }
    } else if (action.error) {
      const { message, title } = action.error;
      if (message && title) {
        store.dispatch(
          sendNotification({
            message: `${title}: ${message}`,
            variant: "error",
          })
        );
      } else if (message && !title) {
        store.dispatch(sendNotification({ message, variant: "error" }));
      }
    }
  } else if (action.payload && action.payload.notification) {
    const notification = action.payload.notification;
    store.dispatch(sendNotification(notification));
  }

  next(action);
};
