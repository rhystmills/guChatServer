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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import bcrypt from "bcrypt";
import Users from "./index.js";
import encryptLoginToken from "./encryptLoginToken.js";
import getExistingUserByEmail from "./getExistingUserByEmail.js";
import formatErrorString from "../../lib/formatErrorString.js";
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
        throw new Error(formatErrorString("login.addSessionToUser", error));
    }
};
var checkIfValidPassword = function (passwordFromLogin, passwordHashFromUser) {
    if (passwordFromLogin === void 0) { passwordFromLogin = null; }
    if (passwordHashFromUser === void 0) { passwordHashFromUser = null; }
    try {
        if (!passwordFromLogin || !passwordHashFromUser)
            return false;
        return bcrypt.compare(passwordFromLogin, passwordHashFromUser);
    }
    catch (error) {
        throw new Error(formatErrorString("login.checkIfValidPassword", error));
    }
};
var validateOptions = function (options) {
    try {
        if (!options)
            throw new Error("options object is required.");
        if (!options.emailAddress)
            throw new Error("options.emailAddress is required.");
        if (!options.password)
            throw new Error("options.password is required.");
    }
    catch (error) {
        throw new Error(formatErrorString("login.validateOptions", error));
    }
};
var login = function (options, _a) {
    var resolve = _a.resolve, reject = _a.reject;
    return __awaiter(void 0, void 0, void 0, function () {
        var existingUser, isValidPassword, login_1, password, sessions, restOfExistingUser, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    validateOptions(options);
                    return [4 /*yield*/, getExistingUserByEmail({
                            emailAddress: options.emailAddress,
                        })];
                case 1:
                    existingUser = _b.sent();
                    if (!existingUser) {
                        return [2 /*return*/, reject("A user with the email address ".concat(options.emailAddress, " could not be found."))];
                    }
                    return [4 /*yield*/, checkIfValidPassword(options.password, existingUser.password)];
                case 2:
                    isValidPassword = _b.sent();
                    if (!isValidPassword) {
                        return [2 /*return*/, reject("Incorrect password.")];
                    }
                    return [4 /*yield*/, encryptLoginToken({
                            userId: existingUser._id,
                            emailAddress: options.emailAddress,
                            password: existingUser.password,
                        })];
                case 3:
                    login_1 = _b.sent();
                    return [4 /*yield*/, addSessionToUser(existingUser._id, login_1)];
                case 4:
                    _b.sent();
                    password = existingUser.password, sessions = existingUser.sessions, restOfExistingUser = __rest(existingUser, ["password", "sessions"]);
                    return [2 /*return*/, resolve(__assign(__assign({}, login_1), { user: __assign({}, restOfExistingUser) }))];
                case 5:
                    error_1 = _b.sent();
                    reject(formatErrorString("login", error_1));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
};
export default (function (options) {
    return new Promise(function (resolve, reject) {
        login(options, { resolve: resolve, reject: reject });
    });
});
//# sourceMappingURL=login.js.map