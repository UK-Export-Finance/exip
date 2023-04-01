const formatTimeOfDay = (date: Date) => {
  const fullDate = new Date(date);
  return `${fullDate.getHours()}:${fullDate.getMinutes()}`;
};

export default formatTimeOfDay;
