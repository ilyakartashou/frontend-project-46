import plain from "./plainFormat.js";
import stylish from "./stylishFormat.js";

const formatters = {
  plain: plain,
  stylish: stylish,
};

const formatter = (ast, format) => {
  return formatters[format](ast);
};
export default formatter;
