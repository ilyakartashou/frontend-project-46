import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import genDiff from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath1 = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
const getFixturePath2 = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);

test("gendiffJSON", () => {
  expect(
    genDiff(getFixturePath1("file1.json"), getFixturePath2("file2.json"))
  ).toEqual(fs.readFileSync(getFixturePath1("patternJSON.txt"), "utf-8"));
});

/* test('gendiffYAML', () => {
  expect(
    genDiff(getFixturePath1('file1.yaml'), getFixturePath2('file2.yaml')),
  ).toEqual(fs.readFileSync(getFixturePath1('patternYAML.txt'), 'utf-8'));
}); */
