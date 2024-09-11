const express = require("express");
const userRoute = require("./routes/userroute");
const logger = require("./middleware/logger");
const todoRoute = require("./routes/todoroute");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(logger)
app.use("/user", userRoute);

app.use("/todo",logger, todoRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
