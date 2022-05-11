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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Users from "./index.js";
import hashString from "./hashString.js";
import encryptLoginToken from "./encryptLoginToken.js";
var addSessionToUser = function (userId, session) {
    if (userId === void 0) { userId = null; }
    if (session === void 0) { session = null; }
    try {
        return Users.updateOne({
            _id: userId,
        }, {
            $addToSet: {
                sessions: session,
            },
        });
    }
    catch (error) {
        throw new Error(formatErrorString("resetPassword.addSessionToUser", error));
    }
};
var setNewPasswordOnUser = function (userId, password) {
    if (userId === void 0) { userId = ""; }
    if (password === void 0) { password = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var hashedPassword, exception_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, hashString(password)];
                case 1:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, Users.updateOne({
                            _id: userId,
                        }, {
                            $set: {
                                password: hashedPassword,
                            },
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, hashedPassword];
                case 3:
                    exception_1 = _a.sent();
                    throw new Error("[actionName.setNewPasswordOnUser] ".concat(exception_1.message));
                case 4: return [2 /*return*/];
            }
        });
    });
};
var getUserWithToken = function (token) {
    if (token === void 0) { token = ""; }
    try {
        return Users.findOne({ "passwordResetTokens.token": token });
    }
    catch (exception) {
        throw new Error("[resetPassword.getUserWithToken] ".concat(exception.message));
    }
};
var validateOptions = function (options) {
    try {
        if (!options)
            throw new Error("options object is required.");
        if (!options.token)
            throw new Error("options.token is required.");
        if (!options.newPassword)
            throw new Error("options.newPassword is required.");
        if (!options.repeatNewPassword)
            throw new Error("options.repeatNewPassword is required.");
    }
    catch (exception) {
        throw new Error("[resetPassword.validateOptions] ".concat(exception.message));
    }
};
var resetPassword = function (options, _a) {
    var resolve = _a.resolve, reject = _a.reject;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, hashedNewPassword, login, exception_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    validateOptions(options);
                    return [4 /*yield*/, getUserWithToken(options.token)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        throw new Error("Sorry, that token is invalid. Please try again.");
                    }
                    if (options.newPassword !== options.repeatNewPassword) {
                        throw new Error("Passwords must match. Please double-check your passwords match and try again.");
                    }
                    return [4 /*yield*/, setNewPasswordOnUser(user === null || user === void 0 ? void 0 : user._id, options.newPassword)];
                case 2:
                    hashedNewPassword = _b.sent();
                    return [4 /*yield*/, encryptLoginToken({
                            userId: user === null || user === void 0 ? void 0 : user._id,
                            emailAddress: user === null || user === void 0 ? void 0 : user.emailAddress,
                            password: hashedNewPassword,
                        })];
                case 3:
                    login = _b.sent();
                    return [4 /*yield*/, addSessionToUser(user === null || user === void 0 ? void 0 : user._id, login)];
                case 4:
                    _b.sent();
                    resolve(__assign({ user: user }, login));
                    return [3 /*break*/, 6];
                case 5:
                    exception_2 = _b.sent();
                    reject("[resetPassword] ".concat(exception_2.message));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
};
export default (function (options) {
    return new Promise(function (resolve, reject) {
        resetPassword(options, { resolve: resolve, reject: reject });
    });
});
//# sourceMappingURL=resetPassword.js.map