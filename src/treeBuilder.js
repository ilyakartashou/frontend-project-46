import _ from "lodash";

/* const stringify = (value, depth) => {
  const iter = (obj, depth2) => {
    const indent = "  ".repeat(depth2 * 2);
    if (!_.isObject(obj)) {
      return obj;
    }
    const keys = Object.keys(obj);
    const result = keys.map((el) => {
      return `    ${indent}${el}: ${stringify(obj[el], depth2 + 1)}`;
    });
    return ["{", ...result, `${indent}}`].join("\n");
  };
  return iter(value, depth);
}; */

export const buildTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const generalKeys = _.union(keys1, keys2);
  const result = generalKeys.reduce((acc, key) => {
    if (typeof data1[key] === "object" && typeof data2[key] === "object") {
      acc.push({
        key,
        value: buildTree(data1[key], data2[key]),
        status: "nested",
      });
    } else if (!Object.hasOwn(data1, key)) {
      acc.push({ key, value: data2[key], status: "added" });
    } else if (!Object.hasOwn(data2, key)) {
      acc.push({ key, value: data1[key], status: "deleted" });
    } else if (data1[key] !== data2[key]) {
      acc.push({
        key,
        oldValue: data1[key],
        newValue: data2[key],
        status: "changed",
      });
    } else {
      acc.push({ key, value: data1[key], status: "unchanged" });
    }
    return acc;
  }, []);
  const temp = _.sortBy(result, ["key"]);
  return temp;
};
