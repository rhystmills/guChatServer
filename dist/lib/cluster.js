import cluster from "cluster";
import os from "os";
import logger from "./logger.js";
export default (function (callback) {
    if (callback === void 0) { callback = null; }
    var cpus = os.cpus().length;
    if (cluster.isMaster) {
        var _loop_1 = function (i) {
            var worker = cluster.fork();
            worker.on("message", function (message) {
                if (process.send) {
                    process.send(message);
                }
            });
            process.on("message", function (message) {
                worker.send(message);
            });
        };
        for (var i = 0; i < cpus; i++) {
            _loop_1(i);
        }
        cluster.on("exit", function (worker) {
            logger.error("Worker ".concat(worker.process.pid, " died."));
        });
    }
    else {
        callback();
    }
});
//# sourceMappingURL=cluster.js.map