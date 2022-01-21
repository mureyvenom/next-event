import type { NextPage } from "next";
import { DUMMY_EVENTS } from "../data/dummy-data";
import EventList from "../src/components/EventList";

const Home: NextPage = () => {
  return (
    <div>
      <EventList items={DUMMY_EVENTS.slice(0, 2)} />
    </div>
  );
};

export default Home;
