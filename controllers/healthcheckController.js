const isServiceHealthy = (req, res, next) => {
  // Format time (reference : https://www.freecodecamp.org/news/javascript-date-now-how-to-get-the-current-date-in-javascript/)
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const healthyData = {
    uptimeDuration: process.uptime(),
    message: "Service is healthy !",
    time: today.toUTCString(), // "Thu, 11 May 2021 09:23:41 GMT"
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
