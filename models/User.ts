import moment from "moment";
import {DataTypes, Model} from "sequelize";
import connection from "./connection";

class User extends Model {
  public user_id?: number;
  public username?: string;
  public password?: string;
  public home?: any;
};

User.init({
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  home: {
    type: DataTypes.JSON,
  },
  last_edit_home: {
    type: DataTypes.DATE,
    defaultValue: moment(),
  },
  createdAt: {
    field: "create_date",
    type: DataTypes.DATE,
    defaultValue: moment(),
  },
  updatedAt: {
    field: "update_date",
    type: DataTypes.DATE,
    defaultValue: moment(),
  },
},
{
  tableName: "user_table",
  sequelize: connection,
})

export default User;