"use strict";

// DOM elements
const calculator = document.querySelector(".container");
const display = document.querySelector(".display");
const calculation = document.querySelector(".calculation");
const answer = document.querySelector(".answer");
const year = document.querySelector("#copyright-year");

// global variables
year.textContent = new Date().getFullYear();
let num1 = [];
let num2 = [];
let answerValue;
let firstOperand;
let secondOperand;
let operations = {
  add: "+",
  subtract: "-",
  multiply: "x",
  divide: "\u00f7",
  equal: "=",
};
let firstElement = true;
let operator;
let freezeDisplay = false;

// addEventListener to calculator
calculator.addEventListener("click", (e) => {
  const percentBtn = e.target.classList.contains("percent");

  if (!e.target.classList.contains("container")) {
    // ------------ FIRST OPERAND ------------
    if (firstElement && !e.target.classList.contains("operand")) {
      if (num1.length === 0 && e.target.classList.contains("decimal")) {
        num1.push("0");
        num1.push(".");
        calculation.textContent = num1.join("");
        answer.textContent = num1.join("");
      }

      // prevents additional decimal from being added to the array
      if (e.target.classList.contains("decimal")) {
        for (let i = 0; i < num1.length; i++) {
          if (!num1.includes(".")) {
            num1.push(e.target.textContent);
            calculation.textContent = num1.join("");
            answer.textContent = num1.join("");
          }
        }
      }

      // updates num1 with selected  number to existing number
      if (e.target.classList.contains("number")) {
        num1.push(e.target.textContent);
        calculation.textContent = num1.join("");
        answer.textContent = num1.join("");
      }
    }

    // updates user interface with operator
    if (e.target.classList.contains("operand")) {
      firstElement = false;
      firstOperand = num1.join("");
      operator = operations[e.target.dataset.operator];
      calculation.textContent = `${firstOperand} ${operator}`;
    }

    // ------------ CREATE SECOND OPERAND ------------
    if (!firstElement) {
      // checks if firstElement is active
      if (num2.length === 0 && e.target.classList.contains("decimal")) {
        num2.push("0");
        num2.push(".");
        calculation.textContent = `${firstOperand} ${operator} ${num2.join("")}`;
        answer.textContent = num2.join("");
      }

      // prevents additional decimal from being added to the array
      if (e.target.classList.contains("decimal")) {
        for (let i = 0; i < num2.length; i++) {
          if (!num2.includes(".")) {
            num2.push(e.target.textContent);
            calculation.textContent = `${firstOperand} ${operator} ${num2.join("")}`;
            answer.textContent = num2.join("");
          }
        }
      }

      // updates num1 with selected  number to existing number
      if (e.target.classList.contains("number")) {
        num2.push(e.target.textContent);
        secondOperand = num2.join("");
        calculation.textContent = `${firstOperand} ${operator} ${secondOperand}`;
        answer.textContent = secondOperand;
      }
    }
    // ------------ PERCENTAGE BUTTON ------------
    if (percentBtn) {
      if (firstElement) {
        // --- ONLY FIRST OPERAND ---
        firstOperand = Number(num1.join(""));
        calculation.textContent = `${firstOperand}%`;
        answerValue = firstOperand / 100;
      } else {
        // --- BOTH OPERANDS ---
        secondOperand = Number(num2.join(""));
        answerValue = operate(firstOperand, operator, secondOperand) / 100;
        calculation.textContent = `${firstOperand} ${operator} ${secondOperand}%`;
      }
    }

    // ------------ CLEAR ALL ------------
    if (e.target.classList.contains("clear")) {
      // removes elements in num1
      do {
        num1.pop();
      } while (num1.length !== 0);

      // removes elements in num2
      do {
        num2.pop();
      } while (num2.length !== 0);

      // resets user interface
      calculation.textContent = "0";
      answer.textContent = "0";
      operator = "";
      firstElement = true;
    }

    // ------------ DELETE ------------
    if (e.target.classList.contains("delete")) {
      // --- DELETING SECOND OPERATOR ---
      if (!firstElement && num2.length > 0) {
        num2.pop();
        secondOperand = num2.join("");
        calculation.textContent = secondOperand
          ? `${firstOperand} ${operator} ${secondOperand}`
          : `${firstOperand} ${operator}`;
        answer.textContent = secondOperand || "0";
        return;
      }

      // --- DELETING OPERATOR ---
      if (!firstElement && num2.length === 0) {
        operator = "";
        firstElement = true;
        calculation.textContent = num1.join("") || "0";
        answer.textContent = num1.join("") || "0";
        return;
      }

      // --- DELETING FIRST OPERATOR ---
      if (firstElement && num1.length > 0) {
        num1.pop();
        calculation.textContent = num1.join("") || "0";
        answer.textContent = num1.join("") || "0";
      }
    }

    // ------------ EXECUTE CALCULATION ------------
    if (e.target.classList.contains("equal") && !percentBtn) {
      answerValue = operate(firstOperand, operator, secondOperand);
      answer.textContent = answerValue;

      if (operator) {
        calculation.textContent = secondOperand
          ? `${firstOperand} ${operator} ${secondOperand}`
          : `${firstOperand} ${operator}`;
      } else {
        calculation.textContent = `${firstOperand}%`;
      }

      // --- START NEW CALCULATION---
      firstElement = true;
      num1 = [];
      num2 = [];
    }
  }
});

// ------------ CALCULATE FUNCTION ------------
function operate(op1, arithmeticOp, op2) {
  // convert op1 and op2 from string to number
  let op1Num = Number(op1);
  let op2Num = Number(op2);

  // use a switch statement
  switch (arithmeticOp) {
    case "+":
      answerValue = op1Num + op2Num;
      break;
    case "-":
      answerValue = op1Num - op2Num;
      break;
    case "x":
      answerValue = op1Num * op2Num;
      break;
    case "\u00f7":
      if (op2Num === 0) {
        answerValue = "Undefined";
      } else {
        answerValue = (op1Num / op2Num).toFixed(2);
      }
      break;
    default:
      console.log("ERROR");
  }
  return answerValue;
}
