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

// Create the entire copyright element dynamically
const copyrightElement = document.createElement('div');
copyrightElement.innerHTML = `Smart Cooking &copy; ${yearString}. All rights reserved.`;

// Append the generated element to the body (or a specific container)
document.body.appendChild(copyrightElement);
