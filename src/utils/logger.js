function logger(req, res) {
  const date = new Date().toLocaleTimeString();
  const protocol = req.protocol;
  const host = req.hostname;
  const PORT = 5000 || process.env.PORT;
  const url = `${protocol}://${host}:${PORT}${req.url}`;
  const status = res.statusCode;
  const type = req.method;
  if (!res?.error) {
    console.log(
      `${date} |`,
      `\x1b[32m${type}\x1b[0m`,
      `${url} -`,
      `\x1b[32m${status}\x1b[0m`
    );
  } else {
    console.log(
      `${date} |`,
      `\x1b[31m${type}\x1b[0m`,
      `${url} -`,
      `\x1b[31m${status}\x1b[0m`
    );
  }
}

module.exports = logger;
