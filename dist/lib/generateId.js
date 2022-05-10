import crypto from "crypto-extra";
export default (function (length) {
    if (length === void 0) { length = 16; }
    return crypto.randomString(length);
});
//# sourceMappingURL=generateId.js.map