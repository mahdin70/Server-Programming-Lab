const routes = require('./routes');
const logRequest=require("./middleware")

app.get("/middleware", logRequest, (req, res) => {
    console.log("We have implemented our first middleware!!");
});

app.use(routes);