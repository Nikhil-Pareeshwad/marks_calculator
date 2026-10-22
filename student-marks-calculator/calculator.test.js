
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { calculateResults } = require("./calculator.js");

test("calculates total, average, percentage and grade", () => {
    const result = calculateResults([80, 70, 90, 60, 100]);

    assert.equal(result.total, 400);
    assert.equal(result.average, 80);
    assert.equal(result.percentage, 80);
    assert.equal(result.passed, true);
    assert.equal(result.grade, "A");
});

test("student passes at exactly 35 in every subject", () => {
    const result = calculateResults([35, 35, 35, 35, 35]);

    assert.equal(result.total, 175);
    assert.equal(result.passed, true);
    assert.equal(result.grade, "D");
});

test("student fails if any subject is below 35", () => {
    const result = calculateResults([34, 80, 80, 80, 80]);

    assert.equal(result.passed, false);
    assert.equal(result.grade, "F");
});

test("zero marks produce a failing result", () => {
    const result = calculateResults([0, 0, 0, 0, 0]);

    assert.equal(result.total, 0);
    assert.equal(result.average, 0);
    assert.equal(result.percentage, 0);
    assert.equal(result.passed, false);
    assert.equal(result.grade, "F");
});

test("maximum marks produce an A+ grade", () => {
    const result = calculateResults([100, 100, 100, 100, 100]);

    assert.equal(result.total, 500);
    assert.equal(result.average, 100);
    assert.equal(result.percentage, 100);
    assert.equal(result.passed, true);
    assert.equal(result.grade, "A+");
});

test("decimal marks are supported", () => {
    const result = calculateResults([75.5, 75.5, 75.5, 75.5, 75.5]);

    assert.equal(result.total, 377.5);
    assert.equal(result.average, 75.5);
    assert.equal(result.percentage, 75.5);
});

test("rejects marks below zero", () => {
    assert.throws(
        () => calculateResults([-1, 50, 50, 50, 50]),
        /between 0 and 100/
    );
});

test("rejects marks above 100", () => {
    assert.throws(
        () => calculateResults([101, 50, 50, 50, 50]),
        /between 0 and 100/
    );
});

test("rejects missing subjects", () => {
    assert.throws(
        () => calculateResults([50, 50, 50, 50]),
        /five subject marks/
    );
});

test("rejects non-numeric marks", () => {
    assert.throws(
        () => calculateResults([50, 50, "abc", 50, 50]),
        /valid numbers/
    );
});
