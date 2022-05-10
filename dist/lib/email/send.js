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
var _a, _b, _c, _d;
import nodemailer from "nodemailer";
import fs from "fs";
import ejs from "ejs";
import { htmlToText } from "html-to-text";
import juice from "juice";
import settings from "../settings.js";
var smtp = nodemailer.createTransport({
    host: (_a = settings === null || settings === void 0 ? void 0 : settings.smtp) === null || _a === void 0 ? void 0 : _a.host,
    port: (_b = settings === null || settings === void 0 ? void 0 : settings.smtp) === null || _b === void 0 ? void 0 : _b.port,
    secure: process.env.NODE_ENV !== "development",
    auth: {
        user: (_c = settings === null || settings === void 0 ? void 0 : settings.smtp) === null || _c === void 0 ? void 0 : _c.username,
        pass: (_d = settings === null || settings === void 0 ? void 0 : settings.smtp) === null || _d === void 0 ? void 0 : _d.password,
    },
});
export default (function (_a) {
    var templateName = _a.template, templateVars = _a.templateVars, restOfOptions = __rest(_a, ["template", "templateVars"]);
    var templatePath = "lib/email/templates/".concat(templateName, ".html");
    var options = __assign({}, restOfOptions);
    if (templateName && fs.existsSync(templatePath)) {
        var template = fs.readFileSync(templatePath, "utf-8");
        var html = ejs.render(template, templateVars);
        var text = htmlToText(html);
        var htmlWithStylesInlined = juice(html);
        options.html = htmlWithStylesInlined;
        options.text = text;
    }
    return smtp.sendMail(options);
});
//# sourceMappingURL=send.js.map