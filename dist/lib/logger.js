import chalk from "chalk";
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.isErrorObject = function (value) {
        return value && value instanceof Error;
    };
    Logger.prototype.getErrorMessage = function (value) {
        var isErrorObject = this.isErrorObject(value);
        if (isErrorObject) {
            return (value === null || value === void 0 ? void 0 : value.message) || (value === null || value === void 0 ? void 0 : value.reason) || value;
        }
        return value;
    };
    Logger.prototype.log = function (message) {
        if (message === void 0) { message = ""; }
        if (message) {
            console.log("".concat(message));
        }
    };
    Logger.prototype.info = function (message) {
        this.log(chalk.blue(this.getErrorMessage(message)));
        this.externalHandler(message);
    };
    Logger.prototype.success = function (message) {
        this.log(chalk.green(this.getErrorMessage(message)));
        this.externalHandler(message);
    };
    Logger.prototype.warn = function (message) {
        this.log(chalk.yellow(this.getErrorMessage(message)));
        this.externalHandler(message);
    };
    Logger.prototype.error = function (error) {
        this.log(chalk.red(this.getErrorMessage(error)));
        this.externalHandler(error);
    };
    Logger.prototype.externalHandler = function (message) {
        // NOTE: Implement calls to third-party logging services here.
    };
    return Logger;
}());
export default new Logger();
//# sourceMappingURL=logger.js.map