
const form = document.getElementById("marksForm");
const errorMessage = document.getElementById("errorMessage");
const result = document.getElementById("result");

const subjectIds = [
    "subject1",
    "subject2",
    "subject3",
    "subject4",
    "subject5"
];

const PASS_MARK = 35;
const MAX_MARK = 100;

// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    errorMessage.textContent = "";
    result.hidden = true;

    // Validate student name
    const name = document
        .getElementById("studentName")
        .value.trim();

    if (!name) {
        showError("Please enter the student's name.");
        return;
    }

    const marks = [];

    // Validate marks for all subjects
    for (const id of subjectIds) {
        const input = document.getElementById(id);
        const rawValue = input.value.trim();

        if (rawValue === "") {
            showError("Please enter marks for all subjects.");
            input.focus();
            return;
        }

        const mark = input.valueAsNumber;

        if (!Number.isFinite(mark)) {
            showError("Please enter valid marks.");
            input.focus();
            return;
        }

        if (mark < 0 || mark > MAX_MARK) {
            showError("Marks must be between 0 and 100.");
            input.focus();
            return;
        }

        marks.push(mark);
    }


    const {
        total,
        average,
        percentage,
        passed,
        grade
    } = calculateResults(marks);


    // Display results safely
    document.getElementById("resultName").textContent =
        "Student: " + name;

    document.getElementById("total").textContent =
        `${total} / ${marks.length * MAX_MARK}`;

    document.getElementById("average").textContent =
        average.toFixed(2);

    document.getElementById("percentage").textContent =
        percentage.toFixed(2) + "%";

    document.getElementById("grade").textContent = grade;

    document.getElementById("status").textContent =
        passed ? "PASS" : "FAIL";

    // Reveal the result section
    result.hidden = false;
});

// Display validation errors
function showError(message) {
    errorMessage.textContent = message;
}

// Reset the form and clear previous results
form.addEventListener("reset", function () {
    errorMessage.textContent = "";
    result.hidden = true;
});
