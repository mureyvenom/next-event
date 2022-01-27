import { createContext, useState, useEffect, Context } from "react";

interface NotificationDataType {
  title: string;
  message: string;
  status: "success" | "error" | "pending" | "";
}

interface NotificationContextProps {
  children: React.ReactNode;
}

interface INotificationContext {
  notificationData?: NotificationDataType | null;
  showNotification: (n: NotificationDataType) => void;
  hideNotification: () => void;
}

const defaultState = {
  notificationData: null,
  showNotification: () => {},
  hideNotification: () => {},
};

const NotificationContext = createContext<INotificationContext>(defaultState);

export const NotificationContextProvider = ({
  children,
}: NotificationContextProps) => {
  const [activeNotification, setActiveNotification] =
    useState<NotificationDataType | null>(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: NotificationDataType) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notificationData: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
