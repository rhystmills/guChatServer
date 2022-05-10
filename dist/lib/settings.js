import fs from "fs";
export default JSON.parse(process.env.APP_SETTINGS ||
    fs.readFileSync("settings-".concat(process.env.NODE_ENV, ".json"), "utf-8") ||
    "{}");
//# sourceMappingURL=settings.js.map