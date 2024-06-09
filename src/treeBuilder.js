import _ from "lodash";
import parse from "./parse.js";

const stringify = (value, depth) => {
  const iter = (obj, depth2) => {
    const tab = "  ";
    const indent = tab.repeat(depth2 * 2);
    if (!_.isObject(obj)) {
      return obj;
    }
    const keys = Object.keys(obj);

    const result = keys.map((item) => {
      const currentValue = obj[item];
      return `    ${indent}${item}: ${stringify(currentValue, depth2 + 1)}`;
    });
    return ["{", ...result, `${indent}}`].join("\n");
  };
  return iter(value, depth);
};
const buildTree = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
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
  const stylish = (difference) => {
    const iter = (diff, depth) => {
      const leftShiftLine = 2;
      const spacesCount = 2;
      const indent = "  ".repeat(depth * spacesCount - leftShiftLine);
      const lines = diff.map((el) => {
        switch (el.status) {
          case "deleted":
            return `  ${indent}- ${el.key}: ${stringify(el.value, depth)}`;
          case "added":
            return `  ${indent}+ ${el.key}: ${stringify(el.value, depth)}`;
          case "unchanged":
            return `  ${indent}  ${el.key}: ${stringify(el.value, depth)}`;
          case "changed":
            return `  ${indent}- ${el.key}: ${stringify(el.oldValue, depth)}\n  ${indent}+ ${el.key}: ${stringify(el.newValue, depth)}`;
          case "nested":
            return `  ${indent}  ${el.key}: ${iter(el.value, depth + 1)}`;
        }
      });
      return ["{", ...lines, `${indent}}`].join("\n");
    };
    return iter(difference, 1);
  };
  const res = stylish(temp);
  return res;
};
export default buildTree;

/* const unionKeys = _.union(keys1, keys2); */
/* const diffCollection = unionKeys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      acc.push({ key, value: data2[key], status: "+" });
    } else if (!Object.hasOwn(data2, key)) {
      acc.push({ key, value: data1[key], status: "-" });
    } else if (data1[key] !== data2[key]) {
      acc.push({ key, value: data1[key], status: "-" });
      acc.push({ key, value: data2[key], status: "+" });
    } else {
      acc.push({ key, value: data1[key], status: " " });
    }
    return acc;
  }, []);
  const result = _.sortBy(diffCollection, ["key"])
    .map(({ status, key, value }) => `  ${status} ${key}: ${value}`)
    .join("\n");

  return `{\n${result}\n}`;
};
 */
