import fs from 'node:fs';
import path from 'node:path';

type Company = {
  id: number;
}

export const getFiles = (folderPath: string): Array<string> => {
  const files = fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName);
  });
  return files;
}

export const getCompanies = (files: String[], companyId: string = ''): Company[] => {
  let companies: Company[] = [];
  for (const filename of files){
    const curFile = fs.readFileSync(filename as string);
    const jsonCurFile = JSON.parse(curFile.toString());
    if (companyId) {
      companies = jsonCurFile.filter((c: Company) => c.id === parseInt(companyId));
      if (companies.length > 0) return companies;
    } else {
      companies = [...companies, ...jsonCurFile];
    }
  }
  return companies;
}
