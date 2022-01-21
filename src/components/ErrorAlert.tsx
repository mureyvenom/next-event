import classes from "../../styles/error-alert.module.css";

interface ErrorAlertProps {
  children: React.ReactNode;
}

function ErrorAlert({ children }: ErrorAlertProps) {
  return <div className={classes.alert}>{children}</div>;
}

export default ErrorAlert;
