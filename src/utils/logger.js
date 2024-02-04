function logger(req, res, statuscode, isError, message) {
  const date = new Date().toLocaleTimeString();
  const protocol = req.protocol;
  const host = req.hostname;
  const PORT = 5000 || process.env.PORT;
  const url = `${protocol}://${host}:${PORT}${req.originalUrl}`;
  const status = statuscode || res?.statusCode;
  const type = req.method;
  if (!isError) {
    console.log(`${date} |`, `${type}`, `${url} -`, `\x1b[32m${status}\x1b[0m`);
    if (message) {
      console.log(`\x1b[32m${message}\x1b[0m`);
    }
  } else {
    console.log(`${date} |`, `${type}`, `${url} -`, `\x1b[31m${status}\x1b[0m`);
    console.log("Error:", `\x1b[31m${message}\x1b[0m`);
  }
}

module.exports = logger;
