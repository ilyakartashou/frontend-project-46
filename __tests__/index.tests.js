import fs from "fs";
import genDiff from "../index.js";
import { getFixturePath } from "../src/helpers.js";

test("gendiffJSON", () => {
  expect(
    genDiff(getFixturePath("file1.json"), getFixturePath("file2.json"))
  ).toEqual(fs.readFileSync(getFixturePath("stylish.text.txt"), "utf-8"));
});

test("gendiffYAML", () => {
  expect(
    genDiff(getFixturePath("file1.yaml"), getFixturePath("file2.yaml"))
  ).toEqual(fs.readFileSync(getFixturePath("stylish.text.txt"), "utf-8"));
});
