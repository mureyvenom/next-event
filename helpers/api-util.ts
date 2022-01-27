import { EventItemType } from "../src/types";

interface dateFilterType {
  year: number;
  month: number;
}

export const getAllEvents = async () => {
  const response = await fetch(
    "https://next-js-events-5ba3a-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const events: EventItemType[] = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getFilteredEvents = async (dateFilter: dateFilterType) => {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

export const getEventById = async (id: string) => {
  const allEvents = await getAllEvents();
  const foundEvent = allEvents.find((event) => event.id === id)!;

  return foundEvent;
};
