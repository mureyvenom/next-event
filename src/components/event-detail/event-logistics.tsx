import AddressIcon from "../../icons/address-icon";
import DateIcon from "../../icons/date-icon";
import LogisticsItem from "./logistics-item";
import classes from "../../../styles/event-logistics.module.css";
import Image from "next/image";

interface EventLogisticsPropTypes {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
}

function EventLogistics({
  date,
  address,
  image,
  imageAlt,
}: EventLogisticsPropTypes) {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} height={240} width={240} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
