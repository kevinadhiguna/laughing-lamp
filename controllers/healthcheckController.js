const isServiceHealthy = (req, res, next) => {
  // Format time (reference : https://www.freecodecamp.org/news/javascript-date-now-how-to-get-the-current-date-in-javascript/)
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  // Returns how many seconds NodeJS process is running (reference : https://nodejs.org/api/process.html#processuptime)
  const processUptime = process.uptime();

  const healthyData = {
    uptime: `The NodeJS process has been running for ${processUptime} seconds`,
    message: "Service is healthy !",
    time: today.toUTCString(),

    // -- Notes --
    // utcTime: today.toUTCString(), // Thu, 11 May 2021 09:23:41 GMT
    // dateTime: today.toDateString(), // Thu May 11 2021
    // isoTime: today.toISOString(), // 2021-05-11T09:23:41.924Z
    // localeTime: today.toLocaleTimeString(), // 9:23:41 AM
  };

  const unhealthyData = {
    message: "Service is unhealthy, please fix problem..",
  };

  try {
    res.status(200).send(healthyData);
  } catch (errorHealthcheck) {
    res.status(503).send(unhealthyData);
  }
};

module.exports = isServiceHealthy;
