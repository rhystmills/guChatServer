var formatErrorString = function (location, error) {
    if (location === void 0) { location = "server"; }
    var message = typeof error === "object" ? error.reason || error.message || error : error;
    return "".concat(process.env.NODE_ENV === "development" ? "[".concat(location, "] ") : "").concat(message);
};
export default formatErrorString;
//# sourceMappingURL=formatErrorString.js.map