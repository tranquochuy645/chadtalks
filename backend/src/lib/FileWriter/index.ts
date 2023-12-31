import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';

class FileWriter {
  /**
   * Write data to a file in the prefixed directory.
   * @param subPath - The sub path inside the prefixed directory where the file will be written.
   * @param data - The data to be written to the file. It can be a string or a Buffer (array buffer view).
   */
  public static write(subPath: string, data: string | NodeJS.ArrayBufferView): void {
    try {
      const filePath = resolve(subPath);
      // Ensure the directory exists before writing the file
      const directory = dirname(filePath);
      if (!existsSync(directory)) {
        mkdirSync(directory, { recursive: true });
      }
      writeFileSync(filePath, data);
      console.log(`File written successfully to: ${filePath}`);
    } catch (error) {
      console.error('Error writing the file:', error);
    }
  }
}

export { FileWriter };
