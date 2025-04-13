# Resulta

Resulta is a TypeScript library that provides a `Result` type for handling success and error values in a functional way. It is inspired by the Result type in Rust.

## Installation

You can install Resulta using npm:

```sh
npm install resulta
```

Or using yarn:

```sh
yarn add resulta
```

## Usage

### Basic Usage

```ts
import { ok, err, Result } from 'resulta';

function hello(message = ''): Result<string, Error> {
    if (!message) {
        return err(new Error('hello without world'));
    }

    return ok(`hello ${message}`);
}

const result = hello();

if (result.ok) {
    console.log(result.value);
} else {
    console.error(result.error);
}
```

### Async Functions

```ts
import { tryCatchAsync } from 'resulta';

async function fetchData(): Promise<string> {
    // Simulate an async operation
    return "data";
}

async function main() {
    const result = await tryCatchAsync(fetchData);

    if (result.ok) {
        console.log(result.value);
    } else {
        console.error(result.error);
    }
}

main();
```

## API

### `ok<T>(value: T): Ok<T>`

Returns an object representing an Ok result.

### `err<E>(error: E): Err<E>`

Returns an object representing an Err result.

### `tryCatchAsync<T, E>(fn: () => Promise<T>): Promise<Result<T, E>>`

Executes a provided asynchronous function and returns a `Result` type.

## Additional Features

### `map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E>`

Transforms the value of a successful `Result` using the provided function.

**Example:**
```ts
import { map, ok } from 'resulta';

const result = ok(2);
const mappedResult = map(result, (value) => value * 2);

console.log(mappedResult); // { ok: true, value: 4 }
```

### `mapErr<T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F>`

Transforms the error of a failed `Result` using the provided function.

**Example:**
```ts
import { mapErr, err } from 'resulta';

const result = err('Error occurred');
const mappedError = mapErr(result, (error) => `Mapped: ${error}`);

console.log(mappedError); // { ok: false, error: 'Mapped: Error occurred' }
```

### `combine<T, E>(results: Result<T, E>[]): Result<T[], E>`

Combines multiple `Result` objects into a single `Result` containing an array of values.

**Example:**
```ts
import { combine, ok, err } from 'resulta';

const results = [ok(1), ok(2), ok(3)];
const combined = combine(results);

console.log(combined); // { ok: true, value: [1, 2, 3] }
```

### `optionToResult<T, E>(option: Option<T>, error: E): Result<T, E>`

Converts an `Option` to a `Result`, using the provided error if the `Option` is `None`.

**Example:**
```ts
import { optionToResult, some, none } from 'resulta';

const option = some(42);
const result = optionToResult(option, 'No value');

console.log(result); // { ok: true, value: 42 }
```

### `resultToOption<T, E>(result: Result<T, E>): Option<T>`

Converts a `Result` to an `Option`, discarding the error if present.

**Example:**
```ts
import { resultToOption, ok, err } from 'resulta';

const result = ok(42);
const option = resultToOption(result);

console.log(option); // { is_some: true, value: 42 }
```

### `mapOption<T, U>(option: Option<T>, fn: (value: T) => U): Option<U>`

Transforms the value of an `Option` using the provided function.

**Example:**
```ts
import { mapOption, some } from 'resulta';

const option = some(2);
const mappedOption = mapOption(option, (value) => value * 2);

console.log(mappedOption); // { is_some: true, value: 4 }
```

### `unwrapOption<T>(option: Option<T>, defaultValue: T): T`

Unwraps the value of an `Option`, returning a default value if it is `None`.

**Example:**
```ts
import { unwrapOption, none } from 'resulta';

const option = none();
const value = unwrapOption(option, 0);

console.log(value); // 0
```

### `flatMap<T, U, E>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E>`

Transforms the value of a successful `Result` using the provided function, allowing chaining.

**Example:**
```ts
import { flatMap, ok } from 'resulta';

const result = ok(2);
const flatMapped = flatMap(result, (value) => ok(value * 2));

console.log(flatMapped); // { ok: true, value: 4 }
```

### `validate<T, E>(value: T, predicate: (value: T) => boolean, error: E): Result<T, E>`

Validates a value using a predicate function, returning a `Result`.

**Example:**
```ts
import { validate } from 'resulta';

const result = validate(10, (value) => value > 5, 'Value must be greater than 5');

console.log(result); // { ok: true, value: 10 }
```

### `fromPromise<T, E>(promise: Promise<T>, errorHandler: (error: unknown) => E): Promise<Result<T, E>>`

Converts a `Promise` to a `Result`, using an error handler for rejected Promises.

**Example:**
```ts
import { fromPromise } from 'resulta';

async function fetchData() {
    return 'data';
}

const result = await fromPromise(fetchData(), (error) => `Error: ${error}`);

console.log(result); // { ok: true, value: 'data' }
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
