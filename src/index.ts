import express, { Request, Response } from 'express';
import {getFiles, getCompanies} from './company';

const app = express();
const port = process.env.PORT || 3000;

const companiesDataPath = './data/companies';

/*
Endpoint to get company by id
*/
app.get('/companies/:id', (req: Request, res: Response) => {
  const companyId = req.params.id;
  // getting array of files paths
  const files = getFiles(companiesDataPath);
  // reading files to get company data by id
  let company = getCompanies(files, companyId)[0];
  // if company exists return company data and status
  if (company) {
    return res.status(200).json({
      data: company,
      status: 200
    });
  } else { // if company doesn't exist return status and message about it
    return res.status(404).json({
      status: 404,
      message: `No company with id ${companyId}`
    });
  }
});

/*
Endpoint to get all companies
Query: sort, limit, offset
Example: http://localhost:3000/companies?sort=asc&limit=5&offset=2
Returns array of companies data and pagination metadata
*/
app.get('/companies', (req: Request, res: Response) => {
  const query = req.query;  
  // getting array of files paths
  const files = getFiles(companiesDataPath);
  // reading files to get array of companies data
  let companies = getCompanies(files);
  // if sort is provided - sort data accordingly
  if (query?.sort === 'desc') {
    companies = companies.sort((a, b) => b.id - a.id);
  } else if (query?.sort === 'asc') {
    companies = companies.sort((a, b) => a.id - b.id);
  }
  const offset: number = query.offset ? parseInt(query.offset.toString()) : 0;
  const limit: number = query.limit ? parseInt(query.limit.toString()) : 100;
  // get 'page' of companies data accordingly to offset and limit
  companies = companies.slice(offset * limit, offset * limit + limit);
  // Return array of companies data and pagination metadata
  res.status(200).json({
    data: companies,
    limit,
    offset
  });
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
