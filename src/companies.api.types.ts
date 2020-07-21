export interface CompaniesResponse {
  allFacets: any[];
  alternatives: any[];
  content: CompanyResponseContent[];
  facetFields: any[];
  facetPivotFields: any[];
  facetQueryResult: {
    content: any[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    sort: string | null;
    numberOfElements: number;
    size: number | null;
    number: number;
  };
  facetResultPages: any[];
  fieldStatsResults: any;
  first: boolean;
  highlighted: any[];
  last: boolean;
  maxScore: number | null;
  number: number;
  numberOfElements: number;
  size: number;
  sort: any | null;
  suggestions: any[];
  totalElements: number;
  totalPages: number;
}

export interface CompanyResponseContent {
  code: number;
  evrk: any;
  evrkName: string | null;
  id: number;
  jarCode: string;
  lastAvgWage: number | null;
  lastNumInsured: number | null;
  lastTax: number | null;
  month: number | null;
  muni: number | null;
  muniName: string;
  name: string;
  nameSearch: string;
  shortname: string;
}

export interface SearchCompaniesParams {
  text?: string;
  minAvgWage?: number;
  maxAvgWage?: number;
  minNumInsured?: number;
  maxNumInsured?: number;
  municipality?: string;
  evrk?: string;
  start?: number;
  size?: number;
}

export interface SearchCompaniesOptions {
  makeGetRequest?: (fullUrl: string) => Promise<{ status: number; body: object }>;
}