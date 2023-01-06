export const formatTimestamp = (timestamp) => {
  let dateObj = new Date(timestamp);
  let date = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let meridiem = "AM";
  if (date < 10) {
    date = "0" + date;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours >= 12) {
    hours %= 12;
    meridiem = "PM";
  }
  return `${month}/${date}/${year} ${hours}:${minutes} ${meridiem}`;
};
