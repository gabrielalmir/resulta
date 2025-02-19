# resulta

## Overview

`resulta` is a TypeScript utility for handling results in an expressive way, inspired by Rust's `Result` type.

## Installation

To install dependencies:

```bash
bun install
```

## Usage

To run the project:

```bash
bun run src/index.ts
```

## Functions

### `ok<T>(value: T): Ok<T>`

Returns an object representing an Ok result.

**Parameters:**
- `value`: The success value.

**Returns:**
- An object of type `Ok<T>`.

### `err<E>(error: E): Err<E>`

Returns an object representing an Err result.

**Parameters:**
- `error`: The error object.

**Returns:**
- An object of type `Err<E>`.

### `match<T, E>(fn: () => Promise<T>): Promise<Result<T, E>>`

Matches the result of an asynchronous function.

**Parameters:**
- `fn`: The asynchronous function to match.

**Returns:**
- A promise that resolves to a `Result<T, E>`.

## Testing

To run tests:

```bash
bun test
```

## Example

```typescript
import { ok, err, match } from "./src/index";

// Example usage of ok
const successResult = ok("success");
console.log(successResult); // { ok: true, value: "success" }

// Example usage of err
const errorResult = err("error");
console.log(errorResult); // { ok: false, error: "error" }

// Example usage of match
const asyncFn = async () => "success";
match(asyncFn).then(result => console.log(result)); // { ok: true, value: "success" }
```

This project was created using `bun init` in bun v1.2.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
