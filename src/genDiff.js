import parse from './parse.js';

export default (filepath1, filepath2) => {
  console.log(parse(filepath1));
  console.log(parse(filepath2));
};
