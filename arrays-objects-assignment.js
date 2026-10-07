// ============================================================
// Arrays & Objects Assignment
// Topics: array of objects, map(), filter(), reduce(), callbacks
// Run with: node arrays-objects-assignment.js
// ============================================================


// ------------------------------------------------------------
// QUESTION 1: Create Student Objects
// An array of 6 student objects. Each has an id, name, age,
// and a grades array of 3 numbers. The mix of grades gives us
// A, B, C, D and F results to test with later.
// ------------------------------------------------------------
const students = [
  { id: 1, name: 'Alice Johnson', age: 20, grades: [85, 92, 78] },
  { id: 2, name: 'Brian Okafor', age: 22, grades: [95, 98, 91] },
  { id: 3, name: 'Chioma Eze', age: 19, grades: [72, 68, 75] },
  { id: 4, name: 'David Mensah', age: 21, grades: [55, 48, 62] },
  { id: 5, name: 'Efe Adeyemi', age: 20, grades: [65, 60, 58] },
  { id: 6, name: 'Fatima Bello', age: 23, grades: [40, 52, 35] },
];

console.log('===== QUESTION 1: students =====');
console.log(students);


// ------------------------------------------------------------
// QUESTION 2: Calculate Averages
// calculateAverage takes an array of grades and returns the
// average rounded to 2 decimal places.
// ------------------------------------------------------------
function calculateAverage(grades) {
  // Guard against an empty array so we never divide by zero (NaN)
  if (grades.length === 0) {
    return 0;
  }

  // reduce() adds every grade into one running total
  const total = grades.reduce((sum, grade) => sum + grade, 0);

  // Divide by the number of grades, then round to 2 decimal places.
  // Number.EPSILON avoids tiny floating point rounding errors.
  const average = total / grades.length;
  return Math.round((average + Number.EPSILON) * 100) / 100;
}

// map() builds a NEW array. For each student we spread (...) the
// existing properties into a new object and add an average property,
// so the original student objects are never changed.
const studentsWithAverage = students.map(student => {
  return {
    ...student,
    average: calculateAverage(student.grades),
  };
});

console.log('\n===== QUESTION 2: studentsWithAverage =====');
console.log(studentsWithAverage);


// ------------------------------------------------------------
// QUESTION 3: Filter Passing Students
// getPassingStudents returns only students whose average is 60+
// ------------------------------------------------------------
function getPassingStudents(students) {
  // filter() keeps only the students where the test returns true
  return students.filter(student => student.average >= 60);
}

const passing = getPassingStudents(studentsWithAverage);

console.log('\n===== QUESTION 3: passing students (average >= 60) =====');
console.log(passing);


// ------------------------------------------------------------
// QUESTION 4: Functions & Callbacks
// processStudents accepts a students array and a callback, runs
// the callback on every student, and returns the new array.
// ------------------------------------------------------------
function processStudents(students, callback) {
  // We pass each student into the callback and collect the results.
  // map() returns a new array, so the original is left untouched.
  return students.map(student => callback(student));
}

// Callback 1: adds a letterGrade based on the student's average
function addLetterGrade(student) {
  let letterGrade;

  if (student.average >= 90) {
    letterGrade = 'A';
  } else if (student.average >= 80) {
    letterGrade = 'B';
  } else if (student.average >= 70) {
    letterGrade = 'C';
  } else if (student.average >= 60) {
    letterGrade = 'D';
  } else {
    letterGrade = 'F';
  }

  // Spread copies the student so we do not mutate the original
  return { ...student, letterGrade };
}

// Callback 2: adds a status of "Pass" (average >= 60) or "Fail"
function addStatus(student) {
  const status = student.average >= 60 ? 'Pass' : 'Fail';

  // Spread again so the original object stays unchanged
  return { ...student, status };
}

const studentsWithGrades = processStudents(studentsWithAverage, addLetterGrade);
console.log('\n===== QUESTION 4a: with letterGrade =====');
console.log(studentsWithGrades);

const studentsWithStatus = processStudents(studentsWithAverage, addStatus);
console.log('\n===== QUESTION 4b: with status =====');
console.log(studentsWithStatus);


// ------------------------------------------------------------
// EXTRA CHECKS: quick tests matching the testing checklist
// ------------------------------------------------------------
console.log('\n===== EXTRA CHECKS =====');

// calculateAverage: (85 + 92 + 78) / 3 = 85
console.log('calculateAverage([85, 92, 78]) =', calculateAverage([85, 92, 78]), '(expected 85)');

// Rounding: (95 + 98 + 91) / 3 = 94.6666... -> 94.67
console.log('calculateAverage([95, 98, 91]) =', calculateAverage([95, 98, 91]), '(expected 94.67)');

// The original students array should NOT have an average property
console.log('Original students unchanged:', students.every(s => s.average === undefined));

// studentsWithAverage should not have been given letterGrade or status
console.log('studentsWithAverage unchanged:', studentsWithAverage.every(s => s.letterGrade === undefined && s.status === undefined));

// getPassingStudents should only return averages of 60 or more
console.log('Only passing students returned:', passing.every(s => s.average >= 60));
console.log('Passing count:', passing.length, 'of', studentsWithAverage.length);
