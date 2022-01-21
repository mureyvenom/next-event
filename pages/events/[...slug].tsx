import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { getFilteredEvents } from "../../data/dummy-data";
import Button from "../../src/components/Button";
import ErrorAlert from "../../src/components/ErrorAlert";
import EventList from "../../src/components/EventList";
import ResultsTitle from "../../src/components/ResultsTitle";

const FilteredEvents: NextPage = () => {
  const router = useRouter();

  const { slug } = router.query;

  if (!slug) {
    return <p className="text-center">Loading...</p>;
  }

  const filteredYear = Number(slug[0]);
  const filteredMonth = Number(slug[1]);

  if (
    isNaN(filteredMonth) ||
    isNaN(filteredYear) ||
    filteredMonth > 12 ||
    filteredMonth < 1
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

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

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

  const date = new Date(filteredYear, filteredMonth);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEvents;
