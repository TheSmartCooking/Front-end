// Set the base year
const baseYear = 2024;

// Get the current year
const currentYear = new Date().getFullYear();

// Define the initial string
let yearString = baseYear.toString();

// If the current year is not the base year, append it to the string
if (currentYear !== baseYear) {
    yearString += `-${currentYear}`;
}

// Set the string to the paragraph
document.getElementById('copyright-year').innerText = yearString;
