import express from "express";
import startup from "./lib/startup.js";
import api from "./api/index.js";
import middleware from "./middleware/index.js";
import logger from "./lib/logger.js";
import websockets from "./websockets/index.js";
startup()
    .then(function () {
    var app = express();
    var port = process.env.PORT || 5001;
    middleware(app);
    api(app);
    var server = app.listen(port, function () {
        if (process.send) {
            process.send("Server running at http://localhost:".concat(port, "\n\n"));
        }
    });
    websockets(server);
    process.on("message", function (message) {
        console.log(message);
    });
})
    .catch(function (error) {
    logger.error(error);
});
//# sourceMappingURL=index.js.map