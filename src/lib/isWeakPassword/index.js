"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWeakPassword = void 0;
// Weak password function
const isWeakPassword = (password) => {
    const minLength = 8; // Minimum password length requirement
    const uppercaseRegex = /[A-Z]/; // Regex to match uppercase letters
    const lowercaseRegex = /[a-z]/; // Regex to match lowercase letters
    const numberRegex = /[0-9]/; // Regex to match numbers
    // Check if the password meets the required criteria
    return (password.length < minLength ||
        !uppercaseRegex.test(password) ||
        !lowercaseRegex.test(password) ||
        !numberRegex.test(password));
};
exports.isWeakPassword = isWeakPassword;
