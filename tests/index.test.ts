import { describe, expect, it } from "vitest";
import { err, ok, tryCatchAsync } from "../src/index";

describe("Result Type Functions", () => {
    it("should return an Ok result", () => {
        const result = ok("success");
        expect(result).toEqual({ ok: true, value: "success" });
    });

    it("should return an Err result", () => {
        const result = err("error");
        expect(result).toEqual({ ok: false, error: "error" });
    });

    it("should match a successful async function", async () => {
        const asyncFn = async () => "success";
        const result = await tryCatchAsync<string, string>(asyncFn);
        expect(result).toEqual({ ok: true, value: "success" });
    });

    it("should match a failing async function", async () => {
        const asyncFn = async () => { throw new Error("error"); };
        const result = await tryCatchAsync<string, Error>(asyncFn);
        expect(result).toEqual({ ok: false, error: new Error("error") });
    });
});
