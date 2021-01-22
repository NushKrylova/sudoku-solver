import { puzzlesAndSolutions } from "../public/puzzle-strings.js";
import { stringWithDot, validModifiedArray, inValidStringWithZero, wrongSolutionArray, arrayWithDot, arrayWithEmptyString, stringWithInvalidLength, stringWithInvalidLengthAndZeroCharacter } from "./testValues.js";

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;

suite("UnitTests", () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile("./views/index.html").then(dom => {
      global.window = dom.window;
      global.document = dom.window.document;

      Solver = require("../public/sudoku-solver.js");
    });
  });

  suite("Function replaceInArrayDotsOnEmptyString()", () => {
    test("Should replace dots in array with on empty string", done => {
      assert.deepStrictEqual(Solver.replaceInArrayDotsOnEmptyString(arrayWithDot), arrayWithEmptyString);
      done();
    });
  });

  suite("Function validateNoZeroDigits()", () => {
    test("Should return true for valid values: 1-9", done => {
      const validValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      validValues.forEach(el => {
        assert.isTrue(Solver.validateNoZeroDigits(el));
      });
      done();
    });

    test("Should return false for invalid values: all other than 1-9", done => {
      const invalidValues = [0, "!", "a", ".", "10", "", " "];
      invalidValues.forEach(el => {
        assert.isFalse(Solver.validateNoZeroDigits(el));
      });
      done();
    });
  });

  suite("Function validateNoZeroDigitsAndDot()", () => {
    test("Should return true for valid values: 1-9 and .", done => {
      const validValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, "."];
      validValues.forEach(el => {
        assert.isTrue(Solver.validateNoZeroDigitsAndDot(el));
      });
      done();
    });
    test("Should return false for invalid values: all except 1-9 and .", done => {
      const invalidValues = [0, "!", "a", "10", "", " "];
      invalidValues.forEach(el => {
        assert.isFalse(Solver.validateNoZeroDigitsAndDot(el));
      });
      done();
    });
  });

  suite("Function validate81StringLength()", () => {
    test("Should return true for 81", done => {
      assert.isTrue(Solver.validate81StringLength(81));
      done();
    });
    const invalidValues = [80, 82];
    test("Should return false for invalid values: " + invalidValues, done => {
      invalidValues.forEach(el => {
        assert.isFalse(Solver.validate81StringLength(invalidValues));
      });
      done();
    });
  });

  suite("Function validateGridValues()", () => {
    test("Should return true for valid string value (1-9 and dot)", done => {
      assert.isTrue(Solver.validateGridValues(stringWithDot));
      done();
    });
    test("Should return false for string value length < 81", done => {
      assert.isFalse(Solver.validateGridValues(stringWithInvalidLength));
      done();
    });
    test("Should return false for string value contains 0", done => {
      assert.isFalse(Solver.validateGridValues(inValidStringWithZero));
      done();
    });
    test("Should return false for string value contains 0 and with lenth < 81", done => {
      assert.isFalse(Solver.validateGridValues(stringWithInvalidLengthAndZeroCharacter));
      done();
    });
  });

  suite("Function findSolution()", () => {
    test("With valid values should find matching solution from puzzle-strings.js", done => {
      assert.deepEqual(Solver.findSolution(validModifiedArray), puzzlesAndSolutions[0]);
      done();
    });
    test("With invalid values should not find matching solution from puzzle-strings.js", done => {
      assert.isUndefined(Solver.findSolution(wrongSolutionArray), "Solution is not found");
      done();
    });
  });
});

