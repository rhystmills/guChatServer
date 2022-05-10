import bcrypt from "bcrypt";
export default (function (string) { return bcrypt.hash(string, 10); });
//# sourceMappingURL=hashString.js.map