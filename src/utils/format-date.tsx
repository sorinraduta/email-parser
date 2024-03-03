export const formatDate = (unixDate: number | string) => {
  if (!unixDate) {
    return "";
  }

  let _unixDate = unixDate;

  if (typeof unixDate === "string") {
    _unixDate = parseInt(unixDate, 10);
  }

  const formattedDate = new Date(_unixDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formattedDate;
};
