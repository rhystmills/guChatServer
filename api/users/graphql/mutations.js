import signup from "../signup.js";
import login from "../login.js";
import setAuthenticationCookie from "../setAuthenticationCookie.js";
import unsetAuthenticationCookie from "../unsetAuthenticationCookie.js";
import generateResetToken from "../generateResetToken.js";
import resetPassword from "../resetPassword.js";
import sendEmail from "../../../lib/email/send.js";
import settings from "../../../lib/settings.js";

export default {
  signup: (parent, args, context) => {
    return signup({
      ...args.user,
    }).then(async (response) => {
      const { user, token, tokenExpiresAt } = response;
      setAuthenticationCookie(context.res, { token, tokenExpiresAt });
      return user;
    });
  },
  login: (parent, args, context) => {
    return login({
      ...args,
    }).then((response) => {
      const { user, token, tokenExpiresAt } = response;
      setAuthenticationCookie(context.res, { token, tokenExpiresAt });
      return user;
    });
  },
  loginWithToken: (parent, args, context) => {
    // NOTE: loginWithToken() is called automatically in the context callback
    // of ApolloServer which will set a user on context if the token is valid.

    if (!context.user) {
      throw new Error("Invalid token. Please login again.");
    }

    return context.user;
  },
  recoverPassword: async (parent, args, context) => {
    const resetToken = await generateResetToken({
      emailAddress: args.emailAddress,
    });
    const resetLink = `${settings?.urls?.app}/reset-password/${resetToken}`;

    if (process.env.NODE_ENV === "development") {
      console.log({ resetLink });
    }

    await sendEmail({
      to: args.emailAddress,
      from: settings?.support?.email,
      subject: "Reset Your Password",
      template: "reset-password",
      templateVars: {
        emailAddress: args.emailAddress,
        resetLink,
      },
    });

    return true;
  },
  resetPassword: (parent, args, context) => {
    return resetPassword({
      ...args,
    }).then((response) => {
      const { user, token, tokenExpiresAt } = response;
      setAuthenticationCookie(context.res, { token, tokenExpiresAt });
      return true;
    });
  },
  logout: (parent, args, context) => {
    return unsetAuthenticationCookie(context.res);
  },
};
