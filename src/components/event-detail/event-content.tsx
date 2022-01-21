import classes from "../../../styles/event-content.module.css";

interface EventContentprops {
  children: React.ReactNode;
}

function EventContent({ children }: EventContentprops) {
  return <section className={classes.content}>{children}</section>;
}

export default EventContent;
