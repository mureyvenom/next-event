/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { EventItemPropType } from "../types";
import Button from "./Button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

const EventItem = ({ item }: EventItemPropType) => {
  return (
    <li key={item.id} className="event-item">
      <img src={`/${item.image}`} alt={item.title} />
      <div className="event-content">
        <h2>{item.title}</h2>
        <div className="event-date">
          <time>
            <DateIcon />
            {new Date(item.date).toLocaleDateString("en-Us", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>
        <div className="event-address">
          <AddressIcon />
          <address>{item.location}</address>
        </div>
        <div className="event-actions">
          <Button link={`/events/${item.id}`}>
            <span>Explore Event</span>
            <span className="event-icon">
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
