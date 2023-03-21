import { describe, it, expect } from "vitest";

function add(x: number, y: number): number {
  return x + y;
}

describe("Example", () => {
  it("should return the sum of the two inputs", () => {
    const result = add(1, 2);
    expect(result).toEqual(3);
  });
});
