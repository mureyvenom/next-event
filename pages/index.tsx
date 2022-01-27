import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../src/components/EventList";
import { EventItemType } from "../src/types";
import NewsletterRegistration from "../src/components/input/newsletter-registration";

interface HomepagePropTypes {
  events: EventItemType[];
}

const Home: NextPage<HomepagePropTypes> = ({ events }) => {
  return (
    <div>
      <Head>
        <title>Events | Featured Events</title>
        <meta name="description" content="Find our lates featured events" />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: true,
  };
};

export default Home;
