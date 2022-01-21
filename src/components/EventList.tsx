import { EventListPropType } from "../types";
import EventItem from "./EventItem";

const EventList = ({ items }: EventListPropType) => {
  return (
    <ul className="event-list">
      {items.map((event) => {
        return <EventItem key={event.id} item={event} />;
      })}
    </ul>
  );
};

export default EventList;
