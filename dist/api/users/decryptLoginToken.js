/* eslint-disable consistent-return */
import jwt from "jsonwebtoken";
import formatErrorString from "../../lib/formatErrorString.js";
import settings from "../../lib/settings.js";
var validateOptions = function (options) {
    try {
        if (!options)
            throw new Error("options object is required.");
        if (!options.token)
            throw new Error("options.token is required.");
    }
    catch (error) {
        throw new Error(formatErrorString("decryptLoginToken.validateOptions", error));
    }
};
var decryptLoginToken = function (options, _a) {
    var resolve = _a.resolve, reject = _a.reject;
    try {
        validateOptions(options);
        var decryptedLoginToken = jwt.verify(options.token, settings.authentication.token);
        resolve(decryptedLoginToken);
    }
    catch (error) {
        reject(formatErrorString("decryptLoginToken", error));
    }
};
export default (function (options) {
    return new Promise(function (resolve, reject) {
        decryptLoginToken(options, { resolve: resolve, reject: reject });
    });
});
//# sourceMappingURL=decryptLoginToken.js.map