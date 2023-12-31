"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultProfileImage = void 0;
const FileWriter_1 = require("../FileWriter");
class DefaultProfileImage {
    /**
     * Create a DefaultProfileImage instance with the specified initials.
     * @param initials - The initials to be displayed on the profile image.
     */
    constructor(initials) {
        this.initials = initials.substr(0, 1).toUpperCase();
        this.size = 200; // Size of the SVG image in pixels
        this.fontSize = Math.floor(this.size / 2); // Increased font size
        this.fontWeight = 'bold'; // Font weight set to bold
        this.background = this.getRandomColor(); // Random background color
        this.textColor = this.getContrastingColor(this.background); // Text color based on the background color
        this.resultSVG = this.generateSvgContent(); // Generate the SVG content
    }
    getRandomColor() {
        // Generate a random hexadecimal color code
        const color = Math.floor(Math.random() * 16777215).toString(16);
        return `#${color}`;
    }
    getContrastingColor(hexColor) {
        // Calculate the luminance of the color
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        // Choose white or black text color based on the luminance
        return luminance > 0.5 ? '#000' : '#FFF';
    }
    generateSvgContent() {
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${this.size}" height="${this.size}" viewBox="0 0 ${this.size} ${this.size}">
      <rect width="100%" height="100%" fill="${this.background}" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${this.fontSize}px" font-weight="${this.fontWeight}" fill="${this.textColor}">
        ${this.initials}
      </text>
    </svg>`;
        // Convert the SVG content to a Buffer
        return Buffer.from(svgContent, 'utf8');
    }
    /**
     * Save the profile image to a file at the specified file path.
     * @param filePath - The file path to save the profile image.
     */
    write(filePath) {
        FileWriter_1.FileWriter.write(filePath, this.resultSVG);
    }
}
exports.DefaultProfileImage = DefaultProfileImage;
