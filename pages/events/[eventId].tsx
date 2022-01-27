import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventContent from "../../src/components/event-detail/event-content";
import EventLogistics from "../../src/components/event-detail/event-logistics";
import EventSummary from "../../src/components/event-detail/event-summary";
import Comments from "../../src/components/input/comments";
import { EventItemType } from "../../src/types";

interface ExtendedParams extends ParsedUrlQuery {
  eventId: string;
}

interface EventDetailProps {
  selectedEvent: EventItemType;
}

const EventDetail: NextPage<EventDetailProps> = ({ selectedEvent }) => {
  const router = useRouter();
  const eventId = router.query.eventId as string;

  const event = selectedEvent;

  return (
    <div>
      {!event ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : (
        <Fragment>
          <Head>
            <title>Event | {event.title}</title>
            <meta name="description" content={event.description} />
          </Head>
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
          <Comments eventId={eventId} />
        </Fragment>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { eventId } = context.params as ExtendedParams;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allEvents = await getFeaturedEvents()!;
  const paths = allEvents.map((event) => {
    return {
      params: {
        eventId: event.id,
      },
    };
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export default EventDetail;
