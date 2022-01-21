export interface EventItemType {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export interface EventListPropType {
  items: EventItemType[];
}

export interface EventItemPropType {
  item: EventItemType;
}
