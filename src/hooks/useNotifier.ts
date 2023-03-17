import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useAppDispatch } from "@/store";
import { removeNotification } from "@/store/notifications";
import { getNotificationsSelector } from "@/store/notifications/notifications.selectors";

let displayed: string[] = [];

export const useNotifier = () => {
  const dispatch = useAppDispatch();
  const notifications = useSelector(getNotificationsSelector);
  const { enqueueSnackbar } = useSnackbar();

  const addDisplayed = (id: string) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: string) => {
    displayed = displayed.filter((d) => d !== id);
  };

  useEffect(() => {
    notifications.forEach(({ message, variant, key }) => {
      if (displayed.includes(key)) {
        return;
      }

      enqueueSnackbar(message, {
        variant,
        key,
        onExited: (event, myKey) => {
          dispatch(removeNotification(myKey.toString()));
          removeDisplayed(myKey.toString());
        },
      });

      addDisplayed(key);
    });
  }, [notifications, dispatch]);
};
