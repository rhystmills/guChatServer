import cors from "cors";
import settings from "../lib/settings.js";
var urlsAllowedToAccess = Object.entries(settings.urls || {}).map(function (_a) {
    var key = _a[0], value = _a[1];
    return value;
}) || [];
export var configuration = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || urlsAllowedToAccess.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("".concat(origin, " not permitted by CORS policy.")));
        }
    },
};
export default (function (req, res, next) {
    return cors(configuration)(req, res, next);
});
//# sourceMappingURL=cors.js.map