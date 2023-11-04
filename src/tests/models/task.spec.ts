import { describe, expect, test } from "bun:test";
import { Task } from "../../models/task";

describe('task model', async () => {
  test('should return a Task object', async () => {
    expect(new Task()).toBeInstanceOf(Task);
  });

  test('should receive a json and return a Task object', async () => {
    const data = {
      id: 1,
      description: "task",
      start: "2020-12-01T00:00:00+00:00"
    };

    expect(Task.fromJson(data)).toBeInstanceOf(Task);
  });
});
