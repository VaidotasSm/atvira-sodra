import { searchCompanies } from './companies.api';
import { parseCompaniesCsv } from './companies.parser';
import type { CompanyParseContent } from './companies.parser';
import {
  fetchCompaniesHistory,
  fromJarCodesToCodes,
  FetchCompaniesHistoryResults,
  CompanyHistoryRecord,
} from './companies.scripts';

export * from './companies.api.types';

const CompaniesAPI = {
  searchCompanies,
};

const CompaniesScripts = {
  fetchCompaniesHistory,
  fromJarCodesToCodes,
};

export type { CompanyParseContent, FetchCompaniesHistoryResults, CompanyHistoryRecord };
const CompaniesParser = {
  parseCompaniesCsv,
};
export { CompaniesAPI, CompaniesParser, CompaniesScripts };
