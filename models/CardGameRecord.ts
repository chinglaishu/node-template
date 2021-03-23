import moment from "moment";
import {DataTypes, Model} from "sequelize";
import connection from "./connection";

class CardGameRecord extends Model {
  public name?: number;
  public score?: string;
};

CardGameRecord.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  tableName: "card_game_record",
  sequelize: connection as any,
})

export default CardGameRecord;