import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../src/components/EventList";
import EventSearch from "../../src/components/EventSearch";
import { EventItemType } from "../../src/types";

interface Props {
  events: EventItemType[];
}

const AllEventsPage: NextPage<Props> = ({ events }) => {
  const router = useRouter();

  const findEventsHandler = (year: string, month: string) => {
    router.push(`events/${year}/${month}`);
  };

  return (
    <Fragment>
      <Head>
        <title>Events | Featured Events</title>
        <meta name="description" content="Find our latest events" />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;
