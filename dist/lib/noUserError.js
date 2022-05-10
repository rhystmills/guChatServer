export default (function (user) {
    if (user === void 0) { user = null; }
    if (!user)
        throw new Error("Sorry, you need to be logged in to do this.");
    return true;
});
//# sourceMappingURL=noUserError.js.map