import { puzzlesAndSolutions } from "../public/puzzle-strings.js";

export const wrongSolutionString= 
  "115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.377";
export const wrongSolutionArray= wrongSolutionString.split("");

export const validModifiedString= 
  "135..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.378";
export const validModifiedArray= validModifiedString.split("");

export const inValidStringWithZero= 
  "1.5..2.04..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16.0..926914.37.";

export const stringForGrid="135762984946381257728459613694517832812936745357824196473298561581673429269145378";
export const arrayForGrid= stringForGrid.split("");

export const stringWithDot="1.576298494638125772845961369451783281293674535782419647329856158167342926914537.";
export const stringWithEmptyString="1 576298494638125772845961369451783281293674535782419647329856158167342926914537 ";
export const arrayWithDot= stringWithDot.split("");
export const arrayWithEmptyString= ["1", "", "5", "7", "6", "2", "9", "8", "4", "9", "4", "6", "3", "8", "1", "2", "5", "7", "7", "2", "8", "4", "5", "9", "6", "1", "3", "6", "9", "4", "5", "1", "7", "8", "3", "2", "8", "1", "2", "9", "3", "6", "7", "4", "5", "3", "5", "7", "8", "2", "4", "1", "9", "6", "4", "7", "3", "2", "9", "8", "5", "6", "1", "5", "8", "1", "6", "7", "3", "4", "2", "9", "2", "6", "9", "1", "4", "5", "3", "7", ""];
export const stringWithInvalidLength = "5..91372.3...8.5.9.9.25..";

export const stringWithInvalidLengthAndZeroCharacter = "5.091372.3...8.5.9.9.25..";

export const stringWithDotReplacedWithIndex2ValueOn8="1.876298494638125772845961369451783281293674535782419647329856158167342926914537.";

export const foundSolutionString = puzzlesAndSolutions[0][1];
export const foundSolutionArray = puzzlesAndSolutions[0][1].split("");