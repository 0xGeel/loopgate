import { formatDistance } from "date-fns";

export const formatRelativeDate = (date: Date | string) => {
  const timestamp = new Date(date);
  return formatDistance(timestamp, new Date(), { addSuffix: true });
};
