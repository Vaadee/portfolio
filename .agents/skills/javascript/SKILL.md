---
name: javascript
description: Write idiomatic, clean, and maintainable JavaScript following the Google JavaScript Style Guide.
---

# JavaScript Skill (Google Style Guide)

This skill enforces strict adherence to the [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html) when generating, reviewing, or refactoring JavaScript code. Ensure all JS code follows these instructions for consistency, readability, and predictability.

## 1. File Formatting & Basics
*   **Encoding:** UTF-8.
*   **Indentation:** Use **2 spaces** for block indentation. Do not use tabs.
*   **Column Limit:** **80 characters** per line (with some exceptions like long URLs or JSDoc strings).
*   **Quotes:** Use **single quotes** (`'`) for normal string literals or **template literals** (`` ` ``) for string interpolation. Never use double quotes (`"`) unless escaping single quotes within a string.
*   **Semicolons:** **Always required**. Do not rely on automatic semicolon insertion (ASI).
*   **Braces:** **Always required** for control structures (e.g., `if`, `for`, `while`), even if the body contains only a single statement. Control structures should use the "Egyptian braces" style (K&R style).

## 2. Variables & Declarations
*   **`const` and `let`:** Always use `const` and `let`. **Never use `var`**. Default to `const` unless the variable needs to be reassigned.
*   **One Variable Per Declaration:** Declare one variable per `let` or `const` statement (e.g., `let a = 1; let b = 2;` instead of `let a = 1, b = 2;`).

## 3. Arrow Functions
*   Use **arrow functions** (`=>`) for all anonymous function expressions and callbacks.
*   Avoid using `function` keywords for callbacks.
*   Use concise bodies when the function only returns a single expression.

## 4. Classes
*   Always use ES6 **`class`** syntax instead of prototype manipulation.
*   Use `extends` for inheritance.
*   Constructors are optional unless you need to initialize state or bind methods.

## 5. Naming Conventions
*   **Variables, Parameters, and Functions:** `camelCase`
*   **Classes and Interfaces:** `PascalCase`
*   **Constants:** `CONSTANT_CASE` (all uppercase with underscores). A constant is a variable intended to be unchanging, exported, and primitive (or deeply immutable).
*   **Private Properties/Methods:** Do not use leading or trailing underscores for private properties (`_private`). Use modern JS `#privateField` syntax if appropriate or treat `camelCase` fields as internal by convention/JSDoc.

## 6. Arrays & Objects
*   **Trailing Commas:** Include a trailing comma whenever there is a line break between the final element and the closing bracket/brace.
*   **Object Property Quotes:** Only quote object keys when they are invalid identifiers (e.g., `'my-key': 1`). Do not quote keys like `myKey: 1`.
*   **Array Literals:** Prefer literal syntax `[]` over `new Array()`.

## 7. Comments & JSDoc
*   Use **JSDoc** (`/** ... */`) for documenting classes, properties, methods, and functions.
*   Include types in JSDoc using `@param {Type} name` and `@return {Type}` when not using TypeScript.
*   Line comments (`//`) are used within functions for implementation details. Leave a space after the `//`.

## 8. General Idioms
*   **Iterating Objects:** Prefer `Object.keys()`, `Object.values()`, or `Object.entries()` over `for...in` loops.
*   **Iterating Arrays:** Prefer `for...of` or `.forEach()` over standard `for` loops unless you need the index.
*   **Equality:** Always use strict equality (`===` and `!==`). Never use `==` or `!=`.
*   **Control Flow:** Avoid `switch` fall-throughs. If intentional, document clearly with a `// fall through` comment.

## Example
```javascript
/**
 * Represents a person.
 */
class Person {
  /**
   * @param {string} firstName
   * @param {string} lastName
   */
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  /**
   * Greets the user.
   * @return {string}
   */
  greet() {
    return `${this.firstName} ${this.lastName} says hello.`;
  }
}

const CONSTANT_VALUE = 42;

const list = ['apple', 'banana', 'cherry'];
const mappedList = list.map((item) => {
  return item.toUpperCase();
});
```
