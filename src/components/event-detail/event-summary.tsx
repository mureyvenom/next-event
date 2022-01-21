import classes from "../../../styles/event-summary.module.css";

interface EventSUmmaryPropTypes {
  title: string;
}

function EventSummary({ title }: EventSUmmaryPropTypes) {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;
