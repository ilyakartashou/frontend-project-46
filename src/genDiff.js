import parse from './parse.js';
import { buildTree, stylish } from './treeBuilder.js';

export default (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const temp = buildTree(data1, data2);
  return stylish(temp);
};
