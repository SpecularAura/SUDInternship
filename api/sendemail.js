const app = require("../app");
const route = require("../routes/sendemail");

app.use("/api/", route);

module.exports = app;