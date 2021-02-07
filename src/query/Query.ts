import UtilFunction from "../utils/UtilFunction";
import QueryHelper from "./QueryHelper";

const Query = {
  async create(Model: any, bodyObj: any, acceptKeyList: string[]) {
    const useDataObj = UtilFunction.filterDataObj(bodyObj, acceptKeyList);
    await Model.create(useDataObj);
    return true;
  },
  async getList(Model: any, useKey: any, valueList: any, excludeList: string[]) {
    const whereObj: any = {};
    whereObj[useKey] = valueList;
    const isGetAll = !UtilFunction.checkIsArrayAndHaveItem(valueList);
    const result = (isGetAll)
      ? await Model.findAll({attributes: {exclude: excludeList}})
      : await Model.findAll({
        attributes: {exclude: excludeList},
        where: whereObj,
      });
    return result;
  },
  async get(Model: any, useKey: string, value: any, excludeList: string[]) {
    const whereObj: any = {};
    whereObj[useKey] = value;
    const result = await Model.findOne({
      attributes: {exclude: excludeList},
      where: whereObj,
    });
    return result;
  },
  async edit(Model: any, useKey: string, bodyObj: any, acceptKeyList: string[], checkKey: string, checkValue: any) {
    return QueryHelper.editDataObj(useKey, bodyObj, Model, acceptKeyList, checkKey, checkValue);
  },
  async delete(Model: any, useKey: any, value: any) {
    const whereObj: any = {};
    whereObj[useKey] = value;
    await Model.destroy({
      where: whereObj,
    });
    return true;
  },
};

export default Query;
