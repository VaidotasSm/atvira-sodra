import { searchCompanies } from './companies.api';
import type {
  CompaniesResponse,
  CompanyResponseContent,
  SearchCompaniesOptions,
  SearchCompaniesParams,
} from './companies.api.types';
import { parseCompaniesCsv } from './companies.parser';
import type { CompanyParseContent } from './companies.parser';

export type { CompaniesResponse, CompanyResponseContent, SearchCompaniesParams, SearchCompaniesOptions };
const CompaniesAPI = {
  searchCompanies,
};

export type { CompanyParseContent };
const CompaniesParser = {
  parseCompaniesCsv,
};
export { CompaniesAPI, CompaniesParser };
