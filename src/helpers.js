import moment from "moment";

export function decodeTime(t) {
  const dh = Math.floor(t / 60);
  const DD = Math.floor(dh / 24)
    .toString()
    .padStart(2, "0");
  const hh = (dh % 24).toString().padStart(2, "0");
  const mm = (t % 60).toString().padStart(2, "0");
  return moment(`2022-01-${DD}T${hh}:${mm}`, "YYYY-MM-DDTHH:mm");
}

/*
 * https://stackoverflow.com/questions/22757908/what-parameters-are-required-to-create-an-add-to-google-calendar-link
 */
export function createCalenderLink({
  title,
  location = "Online",
  startDate,
  endDate,
}) {
  const start = startDate.format("YYYYMMDDTHHmmssZ");
  const end = endDate.format("YYYYMMDDTHHmmssZ");
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${location}&output=xml`;
}
