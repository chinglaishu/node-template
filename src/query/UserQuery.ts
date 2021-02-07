import User from "../../models/User";
import AuthHandler from "../utils/AuthHandler";
import UtilFunction from "../utils/UtilFunction";
import Column from "../utils/Column";

const UserQuery = {
  async create(bodyObj: any) {
    const isValidPassword = AuthHandler.passwordValidation(bodyObj.password);
    if (!isValidPassword) {return false; }
    bodyObj.password = AuthHandler.addSaltAndHashPassword(bodyObj.password);
    const useDataObj = UtilFunction.filterDataObj(bodyObj, Column.User.create);
    await User.create(useDataObj);
    return true;
  },
};

export default UserQuery;
