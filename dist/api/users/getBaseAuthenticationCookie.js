import dayjs from "dayjs";
export default (function (tokenExpiresAt) {
    if (tokenExpiresAt === void 0) { tokenExpiresAt = null; }
    return {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: dayjs(tokenExpiresAt).toDate(),
    };
});
//# sourceMappingURL=getBaseAuthenticationCookie.js.map