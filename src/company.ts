import fs from 'node:fs';
import {getFiles} from './utils';
import {getEmployeesByCompanyId} from './employee';
import {Company, Filter} from './types';

const companiesDataPath = './data/companies';

// adding employees to copmany if there are such
export const addEployeesToCompanies = (companies: Company[]) => {
  const result: Company[] = companies;
  if (result.length > 0) {
    for (const company of result) {
      const employees = getEmployeesByCompanyId(company.id);    
      if (employees.length > 0) {
        company.employees = employees;
      }
    }
  }
  return result;
} 

// get all companies or one company (if id is provided)
export const getCompanies = (companyId: string = ''): Company[] => {
  let companies: Company[] = [];
  // getting list of files in folder
  const files = getFiles(companiesDataPath);
  for (const filename of files){
    const curFile = fs.readFileSync(filename as string);
    const jsonCurFile = JSON.parse(curFile.toString());
    if (companyId) {
      companies = jsonCurFile.filter((c: Company) => c.id === parseInt(companyId));
      // company found - exit from cycle
      if (companies.length > 0) {
        break;
      }
    } else {
      companies = [...companies, ...jsonCurFile];
    }
  }
  // adding employees to companies if applicable
  companies = addEployeesToCompanies(companies);
  return companies;
}

// applying filters to companies
export const filterCompanies = (companies: Company[], filter: Filter): Company[] => {
  let result = companies;
  if (filter.active && (filter.active === 'true' || filter.active === 'false')) {
    result = result.filter(company => {
      if (filter.active === 'true') return company.active === true;
      else return company.active === false;
    });
  }
  if (filter.cn) {
    result = result.filter(company => company.name === filter.cn);
  }
  // any match with employee name (first name, last name, or first name + last name)
  if (filter.en) {
    result = result.filter(company => {
      return company.employees && company.employees.length > 0 && company.employees.some(employee => 
        employee.first_name === filter.en ||
        employee.last_name === filter.en ||
        `${employee.first_name} ${employee.last_name}` === filter.en)
    });
  }
  return result;
}
