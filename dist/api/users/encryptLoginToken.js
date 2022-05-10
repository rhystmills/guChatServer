/* eslint-disable consistent-return */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import formatErrorString from "../../lib/formatErrorString.js";
import settings from "../../lib/settings.js";
var validateOptions = function (options) {
    try {
        if (!options)
            throw new Error("options object is required.");
        if (!options.userId)
            throw new Error("options.userId is required.");
        if (!options.emailAddress)
            throw new Error("options.emailAddress is required.");
        if (!options.password)
            throw new Error("options.password is required.");
    }
    catch (error) {
        throw new Error(formatErrorString("encryptLoginToken.validateOptions", error));
    }
};
var encryptLoginToken = function (options, _a) {
    var resolve = _a.resolve, reject = _a.reject;
    try {
        validateOptions(options);
        var token = jwt.sign(__assign({}, options), settings.authentication.token, {
            expiresIn: "30 days",
        });
        resolve({
            token: token,
            tokenExpiresAt: dayjs().add(30, "days").format(),
        });
    }
    catch (error) {
        reject(formatErrorString("encryptLoginToken", error));
    }
};
export default (function (options) {
    return new Promise(function (resolve, reject) {
        encryptLoginToken(options, { resolve: resolve, reject: reject });
    });
});
//# sourceMappingURL=encryptLoginToken.js.map