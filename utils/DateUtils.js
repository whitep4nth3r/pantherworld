export const DateUtils = {
  sortItemsByDateAsc(a, b) {
    const a_timestamp = Date.parse(a.date);
    const a_date = new Date(a_timestamp);

    const b_timestamp = Date.parse(b.date);
    const b_date = new Date(b_timestamp);

    return a_date - b_date;
  },
  sortItemsByDateDesc: function (a, b) {
    const a_timestamp = Date.parse(a.date);
    const a_date = new Date(a_timestamp);

    const b_timestamp = Date.parse(b.date);
    const b_date = new Date(b_timestamp);

    return b_date - a_date;
  },
  getMonthStringFromInt: function (int) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return months[int];
  },
  getDayStringFromInt: function (int) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[int];
  },
  getDayStringFromIntShort: function (int) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[int];
  },
  addLeadingZero: function (num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
  },
  getDateFromTime: function (startTimeString) {
    const startTimeStamp = Date.parse(startTimeString);
    const startDate = new Date(startTimeStamp);

    return DateUtils.addLeadingZero(startDate.getDate());
  },
  getMonthFromTime: function (startTimeString) {
    const startTimeStamp = Date.parse(startTimeString);
    const startDate = new Date(startTimeStamp);

    return DateUtils.getMonthStringFromInt(startDate.getMonth());
  },
};

module.exports = DateUtils;
