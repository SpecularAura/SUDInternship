const app = require("./app");
const router = require("./routes/router");

app.use("/api", router);
app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  });
