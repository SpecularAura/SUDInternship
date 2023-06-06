const routes = require("express").Router();
const sendMail = require("./sendemail");

routes.get("/", async function (req, res) {
    //homepage route returns some HTML
    res.sendFile('public/index.html', { root: '.' });
});
routes.use("/", sendMail);

module.exports = routes;