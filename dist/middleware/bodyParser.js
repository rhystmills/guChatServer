import bodyParser from "body-parser";
export default (function (req, res, next) {
    var contentType = req.headers["content-type"];
    if (contentType && contentType === "application/x-www-form-urlencoded") {
        return bodyParser.urlencoded({ extended: true })(req, res, next);
    }
    return bodyParser.json()(req, res, next);
});
//# sourceMappingURL=bodyParser.js.map