const express = require("express");
const userRoute = require("./routes/userroute");
const logger = require("./middleware/logger");
const todoRoute = require("./routes/todoroute");
const morgan = require("morgan");
const app = express();
const PORT = 3000;
const path = require('path')
const fs = require('fs')
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(logger);


app.use(morgan("combined", { stream: accessLogStream }));
app.use("/user", userRoute);
app.use("/todo", logger, todoRoute);


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
