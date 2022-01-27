import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Button from "../../src/components/Button";
import ErrorAlert from "../../src/components/ErrorAlert";
import EventList from "../../src/components/EventList";
import ResultsTitle from "../../src/components/ResultsTitle";
import { EventItemType } from "../../src/types";
// import useSWR from "swr";

const FilteredEvents: NextPage = () => {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState<EventItemType[]>([]);
  const [error, setError] = useState("");

  const { slug } = router.query;
  // const { data, error } = useSWR(
  //   "https://next-js-events-5ba3a-default-rtdb.firebaseio.com/events.json"
  // );

  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://next-js-events-5ba3a-default-rtdb.firebaseio.com/events.json"
      )
        .then((resp) => resp.json())
        .then((data) => {
          const events = [];

          for (const key in data) {
            events.push({
              id: key,
              ...data[key],
            });
          }

          setLoadedEvents(events);
        })
        .catch((err) => {
          setError(err);
        });
    };

    fetchData();
    // if (data) {
    //   console.log("changes");
    //   const events = [];

    //   for (const key in data) {
    //     events.push({
    //       id: key,
    //       ...data[key],
    //     });
    //   }

    //   setLoadedEvents(events);
    // }
  }, []);

  if (!slug) {
    return <p>No Parameters</p>;
  }

  const filteredYear = Number(slug[0]);
  const filteredMonth = Number(slug[1]);

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  if (!loadedEvents.length && !error) {
    return <p className="text-center">Loading...</p>;
  }

  if (
    isNaN(filteredMonth) ||
    isNaN(filteredYear) ||
    filteredMonth > 12 ||
    filteredMonth < 1 ||
    error
  ) {
    return (
      <Fragment>
        <div>
          <ErrorAlert>
            <p className="text-center">Invalid parameters</p>
          </ErrorAlert>
          <Button link="/events">View all events</Button>
        </div>
      </Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length < 1) {
    return (
      <Fragment>
        <div className="flex flex-col items-center">
          <ErrorAlert>
            <p>No events found</p>
          </ErrorAlert>
          <Button link="/events">View all events</Button>
        </div>
      </Fragment>
    );
  }

  const updatedDate = new Date(filteredYear, filteredMonth - 1);

  return (
    <Fragment>
      <Head>
        <title>Events | Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${filteredMonth} ${filteredYear}`}
        />
      </Head>
      <ResultsTitle date={updatedDate} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEvents;
