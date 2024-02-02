const Connect = require("./src/connect");
const { app } = require("./src/main");
const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.info(`App is running on Port ${PORT}`);
  Connect();
});
