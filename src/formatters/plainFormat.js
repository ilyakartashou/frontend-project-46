import _ from "lodash";
const getOutput = (value) => {
  if (_.isObject(value)) {
    return "[complex value]";
  } else if (typeof value === "string") {
    return `'${value}'`;
  }
  return value;
};
const plain = (tree) => {
  const iter = (node, start = "") => {
    const result = node
      .filter((el) => el.status !== "unchanged")
      .map((el) => {
        const first = `${start}${el.key}`;
        switch (el.status) {
          case "added":
            return `Property '${first}' was added with value: ${getOutput(el.value)}`;
          case "deleted":
            return `Property '${first}' was removed`;
          case "changed":
            return `Property '${first}' was updated from ${getOutput(el.oldValue)} to ${getOutput(el.newValue)}`;
          case "nested":
            return iter(el.value, `${first}.`);
        }
      });
    return result.join("\n");
  };

  return iter(tree);
};

export default plain;
