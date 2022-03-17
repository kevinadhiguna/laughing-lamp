const isServiceHealthy = (req, res, next) => {
  const healthyData = {
    uptimeDuration: process.uptime(),
    message: "Service is healthy !",
    time: Date.now().toLocaleString(),
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
