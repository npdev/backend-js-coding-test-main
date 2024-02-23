import express, { Request, Response } from 'express';
import {getFiles, getCompanies} from './company';

const app = express();
const port = process.env.PORT || 3000;

const companiesDataPath = './data/companies';

app.get('/companies/:id', (req: Request, res: Response) => {
  const companyId = req.params.id;
  const files = getFiles(companiesDataPath);
  let company = getCompanies(files, companyId)[0];
  if (company) {
    return res.status(200).json({
      data: company,
      status: 200
    });
  } else {
    return res.status(404).json({
      status: 404,
      message: `No company with id ${companyId}`
    });
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
  res.status(200).json({
    data: companies,
    limit,
    offset
  });
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
