import passport from "passport";
import passportLocal from "passport-local";
import HeaderStrategy from "passport-http-header-strategy";
import AuthHandler from "./AuthHandler";
import User from "../../models/User";
import Query from "../query/Query";

const LocalStrategy = passportLocal.Strategy;
const headerStrategy: any = HeaderStrategy;

passport.use('login', new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  async (username, password, done) => {
  const user = await Query.get(User, "username", username, []);
  if (!user) {
    return done(null, false);
  }
  if (!AuthHandler.checkPasswordMatch((user.password as string), password)) {
    return done(null, false);
  }
  return done(null, user);
}));

passport.use('token', new headerStrategy({header: "token", passReqToCallback: true},
  async (req: any, request_origin: any, done: any) => {
    const access_token = (req.header("token") as string);
    const isTokenValid = AuthHandler.checkToken(access_token);
    if (!isTokenValid) {return done(null, false); }
    const user = await Query.get(User, "user_id", isTokenValid, ["password"]);
    return done(null, user);
  }
));

export default passport;