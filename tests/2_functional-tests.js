import { puzzlesAndSolutions } from "../public/puzzle-strings.js";
import {
  arrayForGrid,
  stringWithDot,
  arrayWithEmptyString,
  stringWithInvalidLength,
  inValidStringWithZero,
  stringWithDotReplacedWithIndex2ValueOn8,
  foundSolutionString,
  foundSolutionArray,
  wrongSolutionString,
  stringWithEmptyString,
  arrayWithDot,
  wrongSolutionArray
} from "./testValues.js";

const chai = require("chai");
const assert = chai.assert;

let Solver;

function clearErrorMessage() {
  return (document.getElementById("error-msg").innerText = "");
}

function getErrorMessage() {
  return document.getElementById("error-msg").innerText;
}

function getValuesFromGrid() {
  return Array.from(document.querySelectorAll(".sudoku-input")).map(
    cell => cell.value
  );
}

function getTextAreaValue() {
  return document.getElementById("text-input").value;
}

function preSetGridValues(arrayOfValues) {
  const gridInputs = document.getElementsByClassName("sudoku-input");
  let index = 0;
  for (let gridInput of gridInputs) {
    const value = arrayOfValues[index];
    gridInput.value = value;
    index++;
  }
}
function preSetTextAreaValues(stringOfValues) {
  document.getElementById("text-input").value = stringOfValues;
}
suite("Functional Tests", () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require("../public/sudoku-solver.js");
  });

  suite("Function checkOnError()", () => {
    const lengthErrorMessage =
      "Error: Expected puzzle to be 81 characters long.";
    test("Should show an error message on false", done => {
      //arrange
      clearErrorMessage();
      //act
      Solver.checkOnError(false, lengthErrorMessage);
      //assert
      assert.deepEqual(getErrorMessage(), lengthErrorMessage);
      done();
    });
    test("Should not show an error on true", done => {
      //arrange
      clearErrorMessage();
      //act
      Solver.checkOnError(true, lengthErrorMessage);
      //assert
      assert.deepEqual(getErrorMessage(), "");
      done();
    });
  });

  suite("Function setGridValues()", () => {
    test("Should set grid values", done => {
      Solver.setGridValues(arrayForGrid);
      assert.deepStrictEqual(getValuesFromGrid(), arrayForGrid);
      done();
    });
  });

  suite("Function fillTextArea()", () => {
    test("Should fill text area with value", done => {
      Solver.fillTextArea(stringWithDot);
      assert.deepStrictEqual(getTextAreaValue(), stringWithDot);
      done();
    });
  });

  suite("Function validateAndFillGrid()", () => {
    test("Should replace dot on empty string in input values and insert them in the grid", done => {
      Solver.validateAndFillGrid(stringWithDot);
      assert.deepStrictEqual(getValuesFromGrid(), arrayWithEmptyString);
      done();
    });

    test("Should leave the grid with initial values if input length is < 81", done => {
      //arrange
      preSetGridValues(arrayWithEmptyString);
      //act
      Solver.validateAndFillGrid(stringWithInvalidLength);
      //assert
      assert.deepStrictEqual(getValuesFromGrid(), arrayWithEmptyString);
      done();
    });

    test("Should not update the grid values if input has zero", done => {
      //arrange
      preSetGridValues(arrayWithEmptyString);
      //act
      Solver.validateAndFillGrid(inValidStringWithZero);
      //assert
      assert.deepStrictEqual(getValuesFromGrid(), arrayWithEmptyString);
      done();
    });
  });

  suite("Function updateAndValidateTextAreaValue()", () => {
    const validValue = 8;
    const index = 2;
    test(
      "Should change text area value on index " +
        index +
        " to value " +
        validValue,
      done => {
        //arrange
        preSetTextAreaValues(stringWithDot);
        //act
        Solver.updateAndValidateTextAreaValue(validValue, index);
        //assert
        assert.deepStrictEqual(
          getTextAreaValue(),
          stringWithDotReplacedWithIndex2ValueOn8
        );
        done();
      }
    );
    const invalidValue = 0;
    test(
      "Should not change text area value on index " +
        index +
        " to invalid value " +
        invalidValue,
      done => {
        //arrange
        preSetTextAreaValues(stringWithDot);
        //act
        Solver.updateAndValidateTextAreaValue(invalidValue, index);
        //assert
        assert.deepStrictEqual(getTextAreaValue(), stringWithDot);
        done();
      }
    );
  });

  suite("Function getIndexOfGridInput()", () => {
    test("Should get index index from Grid values by id", done => {
      //arrange
      const id = "B3";
      const index = 11;
      preSetGridValues(arrayWithEmptyString);
      //act
      const result = Solver.getIndexOfGridInput(id);
      //assert
      assert.equal(result, index);
      done();
    });
  });

  suite("Function solve()", () => {
    test("Should find solution for provided values and set it to text and grid areas", done => {
      //arrange
      preSetTextAreaValues(stringWithDot);
      preSetGridValues(stringWithEmptyString);
      //act
      Solver.solve(arrayWithDot);
      //assert
      assert.deepStrictEqual(getTextAreaValue(), foundSolutionString);
      assert.deepStrictEqual(getValuesFromGrid(), foundSolutionArray);
      done();
    });
    test("Should not set new values for text and grid areas if solution for provided values is not found", done => {
      //arrange
      preSetTextAreaValues(stringWithDot);
      preSetGridValues(arrayWithEmptyString);
      //act
      Solver.solve(wrongSolutionArray);
      //assert
      assert.deepStrictEqual(getTextAreaValue(), stringWithDot);
      assert.deepStrictEqual(getValuesFromGrid(), arrayWithEmptyString);
      done();
    });
  });

  suite("Function clear()", () => {
    test("Should clear values in text and grid areas", done => {
      //arrange
      preSetTextAreaValues(stringWithDot);
      preSetGridValues(arrayWithEmptyString);
      //act
      Solver.clear();
      assert.deepStrictEqual(getTextAreaValue(), "");
      //assert
      getValuesFromGrid().forEach(el => assert.isEmpty(el));
      done();
    });
  });
});
