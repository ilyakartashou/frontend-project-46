import _ from 'lodash';
import parse from './parse.js';

export default (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const diffCollection = unionKeys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      acc.push({ key, value: data2[key], status: '+' });
    } else if (!Object.hasOwn(data2, key)) {
      acc.push({ key, value: data1[key], status: '-' });
    } else if (data1[key] !== data2[key]) {
      acc.push({ key, value: data1[key], status: '-' });
      acc.push({ key, value: data2[key], status: '+' });
    } else {
      acc.push({ key, value: data1[key], status: ' ' });
    }
    return acc;
  }, []);
  const result = _.sortBy(diffCollection, ['key'])
    .map(({ status, key, value }) => `  ${status} ${key}: ${value}`)
    .join('\n');

  return `{\n${result}\n}`;
};
