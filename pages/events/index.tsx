import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { DUMMY_EVENTS } from "../../data/dummy-data";
import EventList from "../../src/components/EventList";
import EventSearch from "../../src/components/EventSearch";

const AllEventsPage: NextPage = () => {
  const router = useRouter();

  const findEventsHandler = (year: string, month: string) => {
    router.push(`events/${year}/${month}`);
  };

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={DUMMY_EVENTS} />
    </Fragment>
  );
};

export default AllEventsPage;
