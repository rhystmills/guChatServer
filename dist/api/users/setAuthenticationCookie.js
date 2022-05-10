import getBaseAuthenticationCookie from "./getBaseAuthenticationCookie.js";
export default (function (res, authentication) {
    if (res === void 0) { res = null; }
    if (authentication === void 0) { authentication = null; }
    if (!res || !authentication)
        return null;
    res.cookie("app_login_token", authentication.token, getBaseAuthenticationCookie(authentication.tokenExpiresAt));
    res.cookie("app_login_tokenExpiresAt", authentication.tokenExpiresAt, getBaseAuthenticationCookie(authentication.tokenExpiresAt));
    return res;
});
//# sourceMappingURL=setAuthenticationCookie.js.map