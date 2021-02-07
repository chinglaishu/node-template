
const QueryHelper = {
  async editDataObj(useKey: string, newDataObj: any, model: any, acceptKeyList: string[], checkKey: string, checkValue: any) {
    const whereObj: any = {};
    whereObj[useKey] = newDataObj[useKey];
    let dataObj = await model.findOne({where: whereObj});
    if (!dataObj) {return false; }
    if (checkKey !== "null") {
      if (dataObj[checkKey] !== checkValue) {return false; }
    }
    dataObj = this.getEditDataObj(dataObj, newDataObj, acceptKeyList);
    if (!dataObj) {return false; }
    await dataObj.save();
    return true;
  },
  getEditDataObj(dataObj: any, newDataObj: any, accecptKeyList: string[]) {
    const keyList = Object.keys(newDataObj);
    for (let i = 0 ; i < keyList.length ; i++) {
      if (accecptKeyList.includes(keyList[i])) {
        dataObj[keyList[i]] = newDataObj[keyList[i]];
      }
    }
    return dataObj;
  },
}

export default QueryHelper;
