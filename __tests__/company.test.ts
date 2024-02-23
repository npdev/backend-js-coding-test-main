
import {getCompanies, addEployeesToCompanies, filterCompanies} from '../src/company';
import * as companyToMock from '../src/company';
import * as employeeToMock from '../src/employee';
import {getFiles} from '../src/utils';
import {Company, Employee, Filter} from '../src/types';

// path for test data
const companiesDataPath = './__tests__/test_data';

// expected file name
const filesNames = [
  "__tests__\\test_data\\companies.json",
  "__tests__\\test_data\\employees.json"
];

// expected companies with employees
const companiesWithEmployees: Company[] = [
{"id":25,"name":"Gorczany, Dibbert and Goodwin","industry":"Specialty Insurers","active":false,"website":"https://google.nl","telephone":"916-508-0891","slogan":"Upgradable even-keeled model","address":"3946 Ryan Court","city":"Sacramento","country":"United States",
"employees": [{"id":9,"first_name":"Gustav","last_name":"Seiler","email":"gseiler8@alibaba.com","role":"Human Resources Manager","company_id":25},
              {"id":10,"first_name":"Dar","last_name":"Killingworth","email":null,"role":"VP Product Management","company_id":25}]
},
{"id":26,"name":"Bode and Sons","industry":"Other Consumer Services","active":true,"website":"https://devhub.com","telephone":"304-534-5956","slogan":"Monitored system-worthy pricing structure","address":"5 Atwood Road","city":"Charleston","country":"United States",
"employees": [{"id":11,"first_name":"Caroljean","last_name":"Cancellario","email":"ccancellarioa@fastcompany.com","role":"Chemical Engineer","company_id":26}]
},
{"id":27,"name":"Murphy-Witting","industry":"Packaged Foods","active":false,"website":"http://purevolume.com","telephone":"301-578-5980","slogan":"Advanced fault-tolerant initiative","address":"67 Hanson Court","city":"Hyattsville","country":"United States"}]

// expected companies without employees
const companies: Company[] = [
{"id":25,"name":"Gorczany, Dibbert and Goodwin","industry":"Specialty Insurers","active":false,"website":"https://google.nl","telephone":"916-508-0891","slogan":"Upgradable even-keeled model","address":"3946 Ryan Court","city":"Sacramento","country":"United States",},
{"id":26,"name":"Bode and Sons","industry":"Other Consumer Services","active":true,"website":"https://devhub.com","telephone":"304-534-5956","slogan":"Monitored system-worthy pricing structure","address":"5 Atwood Road","city":"Charleston","country":"United States",},
{"id":27,"name":"Murphy-Witting","industry":"Packaged Foods","active":false,"website":"http://purevolume.com","telephone":"301-578-5980","slogan":"Advanced fault-tolerant initiative","address":"67 Hanson Court","city":"Hyattsville","country":"United States"}]

const company25: Company[] = [{"id":25,"name":"Gorczany, Dibbert and Goodwin","industry":"Specialty Insurers","active":false,"website":"https://google.nl","telephone":"916-508-0891","slogan":"Upgradable even-keeled model","address":"3946 Ryan Court","city":"Sacramento","country":"United States",
"employees": [{"id":9,"first_name":"Gustav","last_name":"Seiler","email":"gseiler8@alibaba.com","role":"Human Resources Manager","company_id":25},
              {"id":10,"first_name":"Dar","last_name":"Killingworth","email":null,"role":"VP Product Management","company_id":25}]
}];

describe('getFiles', () => {
  it('should return array of files names in folder', async () => {
    const response = getFiles(companiesDataPath);
    expect(response).toEqual(filesNames);
  })
});

describe('getCompanies', () => {
  it('should return array of copmanies data', async () => {
    const spy = jest.spyOn(companyToMock, 'addEployeesToCompanies');
    spy.mockReturnValue(companiesWithEmployees);
    const response = getCompanies();
    expect(response).toEqual(companiesWithEmployees);
    spy.mockRestore();
  })
});

describe('getCompanies with id', () => {
  it('should return array of copmanies data', async () => {
    const spy = jest.spyOn(companyToMock, 'addEployeesToCompanies');
    spy.mockReturnValue(company25);
    const response = getCompanies('25');
    expect(response).toEqual([companiesWithEmployees[0]]);
    spy.mockRestore();
  })
});

describe('getCompanies with wrong id', () => {
  it('should return array of copmanies data', async () => {
    const response = getCompanies('404');
    expect(response).toEqual([]);
  })
});

describe('addEployeesToCompanies', () => {
  it('should return given copmanies with added employees', async () => {    
    const spy = jest.spyOn(employeeToMock, 'getEmployeesByCompanyId');
    spy.mockReturnValue(company25[0].employees as Employee[]);
    const response = addEployeesToCompanies([companies[0]]);
    expect(response).toEqual(company25);
    spy.mockRestore();
  })
});

describe('filterCompanies', () => {
  it('should return filtered copmanies', async () => {
    const filter: Filter = {
      active: 'false',
      cn: "Gorczany, Dibbert and Goodwin",
      en: "Dar"
    };
    const response = filterCompanies(companiesWithEmployees, filter);
    expect(response).toEqual([companiesWithEmployees[0]]);
  })
});
