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
import signup from "../signup.js";
import login from "../login.js";
import setAuthenticationCookie from "../setAuthenticationCookie.js";
import unsetAuthenticationCookie from "../unsetAuthenticationCookie.js";
import generateResetToken from "../generateResetToken.js";
import resetPassword from "../resetPassword.js";
import sendEmail from "../../../lib/email/send.js";
import settings from "../../../lib/settings.js";
export default {
    signup: function (parent, args, context) {
        return signup(__assign({}, args.user)).then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
            var user, token, tokenExpiresAt;
            return __generator(this, function (_a) {
                user = response.user, token = response.token, tokenExpiresAt = response.tokenExpiresAt;
                setAuthenticationCookie(context.res, { token: token, tokenExpiresAt: tokenExpiresAt });
                return [2 /*return*/, user];
            });
        }); });
    },
    login: function (parent, args, context) {
        return login(__assign({}, args)).then(function (response) {
            var user = response.user, token = response.token, tokenExpiresAt = response.tokenExpiresAt;
            setAuthenticationCookie(context.res, { token: token, tokenExpiresAt: tokenExpiresAt });
            return user;
        });
    },
    loginWithToken: function (parent, args, context) {
        // NOTE: loginWithToken() is called automatically in the context callback
        // of ApolloServer which will set a user on context if the token is valid.
        if (!context.user) {
            throw new Error("Invalid token. Please login again.");
        }
        return context.user;
    },
    recoverPassword: function (parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
        var resetToken, resetLink;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, generateResetToken({
                        emailAddress: args.emailAddress,
                    })];
                case 1:
                    resetToken = _c.sent();
                    resetLink = "".concat((_a = settings === null || settings === void 0 ? void 0 : settings.urls) === null || _a === void 0 ? void 0 : _a.app, "/reset-password/").concat(resetToken);
                    if (process.env.NODE_ENV === "development") {
                        console.log({ resetLink: resetLink });
                    }
                    return [4 /*yield*/, sendEmail({
                            to: args.emailAddress,
                            from: (_b = settings === null || settings === void 0 ? void 0 : settings.support) === null || _b === void 0 ? void 0 : _b.email,
                            subject: "Reset Your Password",
                            template: "reset-password",
                            templateVars: {
                                emailAddress: args.emailAddress,
                                resetLink: resetLink,
                            },
                        })];
                case 2:
                    _c.sent();
                    return [2 /*return*/, true];
            }
        });
    }); },
    resetPassword: function (parent, args, context) {
        return resetPassword(__assign({}, args)).then(function (response) {
            var user = response.user, token = response.token, tokenExpiresAt = response.tokenExpiresAt;
            setAuthenticationCookie(context.res, { token: token, tokenExpiresAt: tokenExpiresAt });
            return true;
        });
    },
    logout: function (parent, args, context) {
        return unsetAuthenticationCookie(context.res);
    },
};
//# sourceMappingURL=mutations.js.map