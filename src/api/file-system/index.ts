import { promises as fs } from 'fs';

const readFile = (filePath: string) => fs.readFile(filePath);

const unlink = (filePath: string) => fs.unlink(filePath);

const fileSystem = {
  readFile,
  unlink,
};

export default fileSystem;
