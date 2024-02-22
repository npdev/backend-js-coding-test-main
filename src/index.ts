import express, { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';

const app = express();
const port = process.env.PORT || 3000;

const companiesDataPath = './data/companies';

type Company = {
  id: number;
}

const getFiles = (folderPath: string): Array<string> => {
  const files = fs.readdirSync(folderPath).map(fileName => {
    return path.join(companiesDataPath, fileName);
  });
  return files;
}

const getCompanies = (files: String[], companyId: string = ''): Company[] => {
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

app.get('/companies/:id', (req: Request, res: Response) => {
  const companyId = req.params.id;
  const files = getFiles(companiesDataPath);
  let company = getCompanies(files, companyId)[0];
  if (company) {
    return res.status(200).json(company);
  } else {
    return res.status(404).json(`No company with id ${companyId}`);
  }  
});

app.get('/companies', (req: Request, res: Response) => {
  const query = req.query;
  const files = getFiles(companiesDataPath);
  let companies = getCompanies(files);
  if (query?.sort === 'desc') {
    companies = companies.sort((a, b) => b.id - a.id);
  } else if (query?.sort === 'asc') {
    companies = companies.sort((a, b) => a.id - b.id);
  }
  const offset: number = query.offset ? parseInt(query.offset.toString()) : 0;
  const limit: number = query.limit ? parseInt(query.limit.toString()) : 100;
  companies = companies.slice(offset * limit, offset * limit + limit);
  res.status(200).json(companies);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
