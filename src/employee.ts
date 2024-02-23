import fs from 'node:fs';
import {getFiles} from './utils';
import {Employee} from './types';

const employeesDataPath = './data/employees';

// search employees by company id
export const getEmployeesByCompanyId = (companyId: number): Employee[] => {
  let employees: Employee[] = [];
  // getting list of files in folder
  const files = getFiles(employeesDataPath);
  for (const filename of files){
    const curFile = fs.readFileSync(filename as string);
    const jsonCurFile = JSON.parse(curFile.toString());
    const curCompanyemployees = jsonCurFile.filter((e: Employee) => e.company_id === companyId);
    employees = [...employees, ...curCompanyemployees];
  }
  return employees;
}
