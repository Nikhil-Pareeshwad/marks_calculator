
const PASS_MARK = 35;
const MAX_MARK = 100;
const SUBJECT_COUNT = 5;

function calculateResults(marks) {
    if (!Array.isArray(marks) ||
        marks.length !== SUBJECT_COUNT) {
        throw new Error("Exactly five subject marks are required.");
    }

    for (const mark of marks) {
        if (typeof mark !== "number" ||
            !Number.isFinite(mark)) {
            throw new Error("Marks must be valid numbers.");
        }

        if (mark < 0 || mark > MAX_MARK) {
            throw new Error("Marks must be between 0 and 100.");
        }
    }

    const total = marks.reduce(
        (sum, mark) => sum + mark, 0
    );

    const average = total / marks.length;
    const percentage =
        (total / (MAX_MARK * marks.length)) * 100;

    const passed = marks.every(
        mark => mark >= PASS_MARK
    );

    let grade;

    if (!passed) {
        grade = "F";
    } else if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 35) {
        grade = "D";
    } else {
        grade = "F";
    }

    return {
        total,
        average,
        percentage,
        passed,
        grade
    };
}

// Make the function available to Node.js tests.
if (typeof module !== "undefined" && module.exports) {
    module.exports = { calculateResults };
}
