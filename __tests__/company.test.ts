
import {getFiles, getCompanies} from '../src/company';

// path for test data
const companiesDataPath = './__tests__/test_data';

// expected file name
const filesNames = [
  "__tests__\\test_data\\companies.json"
];

// expected companies data
const companies = [{"id":26,"name":"Bode and Sons","industry":"Other Consumer Services","active":true,"website":"https://devhub.com","telephone":"304-534-5956","slogan":"Monitored system-worthy pricing structure","address":"5 Atwood Road","city":"Charleston","country":"United States"},
{"id":27,"name":"Murphy-Witting","industry":"Packaged Foods","active":false,"website":"http://purevolume.com","telephone":"301-578-5980","slogan":"Advanced fault-tolerant initiative","address":"67 Hanson Court","city":"Hyattsville","country":"United States"}]

describe('getFiles', () => {
  it('should return array of files names in folder', async () => {
    const response = getFiles(companiesDataPath);
    expect(response).toEqual(filesNames);
  })
});

describe('getCompanies', () => {
  it('should return array of copmanies data', async () => {
    const response = getCompanies(filesNames);
    expect(response).toEqual(companies);
  })
});

describe('getCompanies with id', () => {
  it('should return array of copmanies data', async () => {
    const response = getCompanies(filesNames, '27');
    expect(response).toEqual([companies[1]]);
  })
});

describe('getCompanies with wrong id', () => {
  it('should return array of copmanies data', async () => {
    const response = getCompanies(filesNames, '404');
    expect(response).toEqual([]);
  })
});
