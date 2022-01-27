import { FormEvent, useContext, useRef, useState } from "react";
import NotificationContext from "../../../store/notification-context";
import ErrorAlert from "../ErrorAlert";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const { showNotification, hideNotification } =
    useContext(NotificationContext);

  const registrationHandler = (event: FormEvent) => {
    event.preventDefault();
    showNotification({
      title: "Signing up",
      message: "Adding email to newsletter database",
      status: "pending",
    });
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current?.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((text) => {
            throw new Error(text.message);
          });
        }
      })
      .then((data) => {
        showNotification({
          title: "Successful",
          message: "Successfully signed up to events newsletter",
          status: "success",
        });
      })
      .catch((err) => {
        showNotification({
          title: "Error",
          message: err.message,
          status: "error",
        });
        setError(err.message);
      });
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
