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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
