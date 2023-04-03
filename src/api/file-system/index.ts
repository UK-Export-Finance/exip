import { promises as fs } from 'fs';

/**
 * readFile
 * Read a file
 * @param {String} file path
 * @returns {Promise<Buffer>} File buffer
 */
const readFile = (filePath: string) => fs.readFile(filePath);

/**
 * unlink
 * Delete a file
 * @param {String} file path
 * @returns {Promise<void>} File buffer
 */
const unlink = (filePath: string) => fs.unlink(filePath);

const fileSystem = {
  readFile,
  unlink,
};

export default fileSystem;
