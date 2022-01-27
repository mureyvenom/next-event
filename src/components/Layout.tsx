import { Fragment, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Header from "./Header";
import Notification from "./Notification";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { notificationData } = useContext(NotificationContext);

  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      {notificationData && (
        <Notification
          title={notificationData.title}
          message={notificationData.message}
          status={notificationData.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
