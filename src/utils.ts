import fs from 'node:fs';
import path from 'node:path';

// getting array of files paths in the given folder
export const getFiles = (folderPath: string): Array<string> => {
  const files = fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName);
  });
  return files;
}
