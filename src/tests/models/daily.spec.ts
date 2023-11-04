import { describe, expect, test } from "bun:test";
import { Daily } from "../../models/daily";

describe("daily model", async () => {
  test("should return a Daily object", async () => {
    expect(new Daily("task", "duration")).toBeInstanceOf(Daily);
  });

  test("should return correct string", async () => {
    expect(new Daily("task", "duration").toString()).toBe("task - duration");
  })

  test("should receive a json and return a Daily object", async () => {
    const data = {
      description: "task",
      start: "2020-12-01T00:00:00+00:00"
    };

    expect(Daily.fromJson(data)).toBeInstanceOf(Daily);
  });
});
