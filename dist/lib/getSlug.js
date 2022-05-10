import getSlug from "speakingurl";
export default (function (string) {
    if (string === void 0) { string = ""; }
    return getSlug(string, {
        separator: "-",
        custom: { "'": "" },
    });
});
//# sourceMappingURL=getSlug.js.map