import { promises as fs } from 'fs';
import path from 'path';
import { ACCEPTED_FILE_TYPES } from '../constants';

/**
 * fileExists
 * Check if a file exists
 * @param {String} file path
 * @returns {Promise<Buffer> | Boolean} File buffer
 */
const fileExists = (filePath: Buffer | string) => {
  const fileBuffer = Buffer.from(filePath);

  if (fileBuffer.length) {
    return true;
  }

  return false;
};

/**
 * isAcceptedFileType
 * Check if a file is an accepted file type.
 * @param {String} file path
 * @returns {Boolean}
 */
const isAcceptedFileType = (filePath: string) => {
  const fileType = path.extname(filePath);

  if (ACCEPTED_FILE_TYPES.includes(fileType)) {
    return true;
  }

  return false;
};

/**
 * readFile
 * Read a file and check if the file type is accepted
 * @param {String} file path
 * @returns {Promise<Buffer> | Boolean} File buffer
 */
const readFile = async (filePath: string): Promise<Buffer> => {
  try {
    console.info('Reading file %s', filePath);

    const file = await fs.readFile(filePath);

    if (fileExists(file) && isAcceptedFileType(filePath)) {
      return file;
    }

    throw new Error('Reading file - does not exist or is unaccepted file type');
  } catch (err) {
    console.error('Error reading file %O', err);

    throw new Error(`Reading file ${err}`);
  }
};

/**
 * unlink
 * Delete a file
 * @param {String} file path
 * @returns {Promise<void> | Boolean} File buffer
 */
const unlink = async (filePath: string) => {
  try {
    console.info('Deleting file %s', filePath);

    const file = await readFile(filePath);

    if (file) {
      await fs.unlink(filePath);
    }

    return false;
  } catch (err) {
    console.error('Error deleting file %O', err);

    throw new Error(`Deleting file ${err}`);
  }
};

const fileSystem = {
  fileExists,
  isAcceptedFileType,
  readFile,
  unlink,
};

export default fileSystem;
