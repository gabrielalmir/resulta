export type Ok<T> = { ok: true; value: T };
export type Err<E> = { ok: false; error: E };
export type Result<T, E> = Ok<T> | Err<E>;

export type Some<T> = { isSome: true; value: T };
export type None = { isSome: false };
export type Option<T> = Some<T> | None;

/**
 * Returns an object representing an Ok result.
 * @param value Success value.
 */
export function ok<T>(value: T): Ok<T> {
    return { ok: true, value };
}

/**
 * Returns an object representing an Err result.
 * @param error Error object.
 */
export function err<E>(error: E): Err<E> {
    return { ok: false, error };
}

/**
 * Returns an object representing a Some value.
 * @param value The value.
 */
export function some<T>(value: T): Some<T> {
    return { isSome: true, value };
}

/**
 * Returns an object representing a None value.
 */
export function none(): None {
    return { isSome: false };
}

/**
 * Executes a provided asynchronous function and returns a `Result` type.
 *
 * @template T - The type of the successful result.
 * @template E - The type of the error result.
 * @param {() => Promise<T>} fn - The asynchronous function to execute.
 * @returns {Promise<Result<T, E>>} A promise that resolves to a `Result` type,
 *                                  containing either the successful result or an error.
 */
export async function tryCatchAsync<T, E>(fn: () => Promise<T>): Promise<Result<T, E>> {
    try {
        const result = await fn();
        return ok(result);
    } catch (error) {
        return err(error as E);
    }
}

/**
 * Transforms the value of a successful Result using the provided function.
 * @param result The Result to transform.
 * @param fn The function to apply to the value.
 * @returns A new Result with the transformed value, or the original error.
 */
export function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
    return result.ok ? ok(fn(result.value)) : result;
}

/**
 * Transforms the error of a failed Result using the provided function.
 * @param result The Result to transform.
 * @param fn The function to apply to the error.
 * @returns A new Result with the transformed error, or the original value.
 */
export function mapErr<T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F> {
    return result.ok ? result : err(fn(result.error));
}

/**
 * Combines multiple Results into a single Result containing an array of values.
 * @param results An array of Results to combine.
 * @returns A Result containing an array of values if all are successful, or the first error encountered.
 */
export function combine<T, E>(results: Result<T, E>[]): Result<T[], E> {
    const values: T[] = [];
    for (const result of results) {
        if (!result.ok) return result;
        values.push(result.value);
    }
    return ok(values);
}

/**
 * Converts an Option to a Result, using the provided error if the Option is None.
 * @param option The Option to convert.
 * @param error The error to use if the Option is None.
 * @returns A Result containing the value of the Option, or the provided error.
 */
export function optionToResult<T, E>(option: Option<T>, error: E): Result<T, E> {
    return option.isSome ? ok(option.value) : err(error);
}

/**
 * Converts a Result to an Option, discarding the error if present.
 * @param result The Result to convert.
 * @returns An Option containing the value of the Result, or None if it is an error.
 */
export function resultToOption<T, E>(result: Result<T, E>): Option<T> {
    return result.ok ? some(result.value) : none();
}

/**
 * Transforms the value of an Option using the provided function.
 * @param option The Option to transform.
 * @param fn The function to apply to the value.
 * @returns A new Option with the transformed value, or None if the original Option is None.
 */
export function mapOption<T, U>(option: Option<T>, fn: (value: T) => U): Option<U> {
    return option.isSome ? some(fn(option.value)) : none();
}

/**
 * Unwraps the value of an Option, returning a default value if it is None.
 * @param option The Option to unwrap.
 * @param defaultValue The default value to return if the Option is None.
 * @returns The value of the Option, or the default value.
 */
export function unwrapOption<T>(option: Option<T>, defaultValue: T): T {
    return option.isSome ? option.value : defaultValue;
}

/**
 * Transforms the value of a successful Result using the provided function, allowing chaining.
 * @param result The Result to transform.
 * @param fn The function to apply to the value.
 * @returns A new Result with the transformed value, or the original error.
 */
export function flatMap<T, U, E>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E> {
    return result.ok ? fn(result.value) : result;
}

/**
 * Validates a value using a predicate function, returning a Result.
 * @param value The value to validate.
 * @param predicate The predicate function to apply.
 * @param error The error to return if the predicate fails.
 * @returns A Result containing the value if valid, or the provided error.
 */
export function validate<T, E>(value: T, predicate: (value: T) => boolean, error: E): Result<T, E> {
    return predicate(value) ? ok(value) : err(error);
}

/**
 * Converts a Promise to a Result, using an error handler for rejected Promises.
 * @param promise The Promise to convert.
 * @param errorHandler The function to handle errors.
 * @returns A Promise resolving to a Result containing the value or the handled error.
 */
export async function fromPromise<T, E>(promise: Promise<T>, errorHandler: (error: unknown) => E): Promise<Result<T, E>> {
    try {
        const value = await promise;
        return ok(value);
    } catch (error) {
        return err(errorHandler(error));
    }
}
