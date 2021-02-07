import jwt from "jsonwebtoken";
import crypto from "crypto";
import PasswordValidator from "password-validator";

const passwordValidator = new PasswordValidator();
passwordValidator.is().min(8).has().not().spaces();

const SECRET_KEY = process.env.symbior_gateway_token_secret || "test_token_secret_d4h4vgr5s";
const expireDay = "30d";

const AuthHandler = {
  createToken(user_id: any) {
    return jwt.sign({user_id}, SECRET_KEY, { expiresIn: expireDay });
  },
  verifyToken(token: string) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return false;
    }
  },
  checkToken(token: string) {
    const useToken: any = this.verifyToken(token);
    if (!useToken) {return false; }
    const user_id = useToken.user_id;
    return parseInt(user_id);
  },
  addSaltAndHashPassword(password: string) {
    let salt = process.env.BEAR_PASSWORD_SALT || "PASSWORD_SALT_SDEEFEF3232432";
    const saltAndPassword = password + salt;
    const hash = crypto.createHash("sha256").update(saltAndPassword).digest("hex");
    return hash;
  },
  checkPasswordMatch(hashedPassword: string, checkPassword: string) {
    const hashedCheckPassword = this.addSaltAndHashPassword(checkPassword);
    return hashedPassword === hashedCheckPassword;
  },
  passwordValidation(password: string) {
    return passwordValidator.validate(password);
  },
}

export default AuthHandler;
