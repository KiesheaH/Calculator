# Odin Calculator

## Overview

This project is a browser-based calculator that performs basic arithmetic operations. The main goal is to practice JavaScript logic, state management, and DOM manipulation, while also handling common edge cases found in real world calculators.

The calculator processes user input, storing values internally and updating the display dynamically as buttons are pressed.

## Features

The calculator supports the following operations:

- Addition
- Subtraction
- Multiplication
- Division

Each calculation consists of:

- First number (operand)
- Operator
- Second number (operand)

Additional functionality:

- User can input decimal numbers using a . button
  - Only one decimal is allowed per number.
  - The . button is disabled if a decimal is already in the current number.
- Users can undo their last input using a backspace button.
- Users can clear current input and operations using the "clear all" button.

The calculator evaluates one operation at a time and displays result before continuing with the next calculation, mimicking the behavior of a standard handheld calculator.
