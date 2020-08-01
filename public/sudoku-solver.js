const textArea = document.getElementById("text-input");
const gridArea = document.getElementById("sudoku-grid");
const gridInputs = document.getElementsByClassName("sudoku-input");
const error = document.getElementById("error-msg");

const solveButton = document.getElementById("solve-button");
const clearButton = document.getElementById("clear-button");

import { puzzlesAndSolutions } from "./puzzle-strings.js";

const initialValues = puzzlesAndSolutions[1][0];
const lengthErrorMessage = "Error: Expected puzzle to be 81 characters long.";

function replaceInArrayDotsOnEmptyString(arrayOfValues) {
  return arrayOfValues.map(value => {
    if (value === ".") {
      return (value = "");
    } else {
      return value;
    }
  });
}

function validateNoZeroDigits(value) {
  return /^[1-9]$/.test(value);
}

function validateNoZeroDigitsAndDot(stringOfValues) {
  return /^[1-9\.]+$/.test(stringOfValues);
}

function validate81StringLength(length) {
  return length === 81;
}

function checkOnError(isValid, errorMessage) {
  if (!isValid) {
    error.innerText = errorMessage;
  } else {
    error.innerText = "";
  }
}

function setGridValues(arrayOfValues) {
  let index = 0;
  for (let gridInput of gridInputs) {
    const value = arrayOfValues[index];
    gridInput.value = value;
    index++;
  }
}

function fillTextArea(stringOfValues) {
  textArea.value = stringOfValues;
}

function validateGridValues(stringOfValues) {
  let isLengthValid = validate81StringLength(stringOfValues.length);
  checkOnError(isLengthValid, lengthErrorMessage);
  return isLengthValid && validateNoZeroDigitsAndDot(stringOfValues);
}

function validateAndFillGrid(stringOfValues) {
  let isValuesValid = validateGridValues(stringOfValues);
  if (isValuesValid) {
    let arrayOfValues = stringOfValues.split("");
    let arrayOfUpdatedValues = replaceInArrayDotsOnEmptyString(arrayOfValues);
    setGridValues(arrayOfUpdatedValues);
  }
}

function updateAndValidateTextAreaValue(value, index) {
  if (validateNoZeroDigits(value)) {
    let initialValue = textArea.value;
    textArea.value =
      initialValue.substring(0, index) +
      value +
      initialValue.substring(index + 1);
  }
}

function getIndexOfGridInput(id) {
  for (let index = 0; index < gridInputs.length; index++) {
    if (gridInputs[index] === gridInputs.namedItem(id)) {
      return index;
    }
  }
}

function findSolution(arrayOfValues) {
  return puzzlesAndSolutions.find(solution =>
    arrayOfValues.every(
      (value, index) =>
        solution[0][index] === value || solution[1][index] === value
    )
  );
}

function solve(arrayOfValues) {
  let foundSolution = findSolution(arrayOfValues);
  if (foundSolution) {
    fillTextArea(foundSolution[1]);
    setGridValues(foundSolution[1].split(""));
  }
}

function clear() {
  textArea.value = "";
  for (let gridInput of gridInputs) {
    gridInput.value = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fillTextArea(initialValues);
  validateAndFillGrid(initialValues);
});

textArea.addEventListener("input", e => {
  validateAndFillGrid(e.target.value);
});

gridArea.addEventListener("input", e => {
  let value = e.target.value;
  let index = getIndexOfGridInput(e.target.id);
  updateAndValidateTextAreaValue(value, index);
});

solveButton.addEventListener(
  "click",
  () => solve(textArea.value.split("")),
  false
);

clearButton.addEventListener("click", clear, false);

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    initialValues,
    replaceInArrayDotsOnEmptyString,
    validateNoZeroDigits,
    validateNoZeroDigitsAndDot,
    validate81StringLength,
    checkOnError,
    setGridValues,
    fillTextArea,
    validateGridValues,
    validateAndFillGrid,
    updateAndValidateTextAreaValue,
    getIndexOfGridInput,
    findSolution,
    clear,
    solve
  };
} catch (e) {}
