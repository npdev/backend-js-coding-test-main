import {getEmployeesByCompanyId} from '../src/employee';
import * as utilsToMock from '../src/utils';

// expected file name
const filesNames = [
  "__tests__\\test_data\\employees.json"
];

// expected employees data
const employees = [{"id":9,"first_name":"Gustav","last_name":"Seiler","email":"gseiler8@alibaba.com","role":"Human Resources Manager","company_id":25},
{"id":10,"first_name":"Dar","last_name":"Killingworth","email":null,"role":"VP Product Management","company_id":25},
{"id":11,"first_name":"Caroljean","last_name":"Cancellario","email":"ccancellarioa@fastcompany.com","role":"Chemical Engineer","company_id":26}];

describe('getEmployeesByCompanyId', () => {
  it('should return array of employees by company id', async () => {    
    const spy = jest.spyOn(utilsToMock, 'getFiles');
    spy.mockReturnValue(filesNames);
    const response = getEmployeesByCompanyId(25);
    expect(response).toEqual([employees[0], employees[1]]);
    spy.mockRestore();
  })
});
