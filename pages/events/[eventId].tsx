import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { getEventById } from "../../data/dummy-data";
import ErrorAlert from "../../src/components/ErrorAlert";
import EventContent from "../../src/components/event-detail/event-content";
import EventLogistics from "../../src/components/event-detail/event-logistics";
import EventSummary from "../../src/components/event-detail/event-summary";

const EventDetail: NextPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId as string;

  const event = getEventById(eventId);
  return (
    <div>
      {!event ? (
        <ErrorAlert>
          <h1>No event found</h1>
        </ErrorAlert>
      ) : (
        <Fragment>
          <EventSummary title={event.title} />
          <EventLogistics
            date={event.date}
            address={event.location}
            imageAlt={event.title}
            image={event.image}
          />
          <EventContent>
            <p>{event.description}</p>
          </EventContent>
        </Fragment>
      )}
    </div>
  );
};

export default EventDetail;
