
const UtilFunction = {
  checkIsArray(item: any) {
    if (!item) {return false; }
    return Array.isArray(item);
  },
  checkIsArrayAndHaveItem(item: any) {
    if (!this.checkIsArray(item)) {return false; }
    return item.length > 0;
  },
  filterDataObj(dataObj: any, accecptKeyList: string[]) {
    const useDataObj: any = {};
    const keyList = Object.keys(dataObj);
    for (let i = 0 ; i < keyList.length ; i++) {
      if (accecptKeyList.includes(keyList[i])) {
        useDataObj[keyList[i]] = dataObj[keyList[i]];
      }
    }
    return useDataObj;
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
};

export default UtilFunction;
