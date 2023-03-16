import { formatDistance } from "date-fns";

const formatRelativeDate = (date: Date | string) => {
  const ts = new Date(date);
  return formatDistance(ts, new Date(), { addSuffix: true });
};

export default formatRelativeDate;
