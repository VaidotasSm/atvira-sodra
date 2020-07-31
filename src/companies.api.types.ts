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

export interface CompaniesHistoryResponseContent {
  lookupId: number;
  code: number;
  jarCode: string;
  name: string;
  shortname: string;
  month: number;
  avgWage: number | null;
  avgWage2: number | null;
  numInsured: number;
  numInsured2: number;
  tax: number | null;
  ecoActName: string;
  ecoActCode: number;
  municipality: string;
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
  sort?: SortParam[];
}

export interface SearchCompanyHistoryFullParams {
  dc?: number;
  codes?: number;
  start?: number;
  size?: number;
  sort?: SortParam[];
}

export interface CompaniesHistoryFullResponse {
  content: CompaniesHistoryResponseContent[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  sort: [
    {
      direction: 'ASC' | 'DESC';
      property: string;
      ignoreCase: boolean;
      nullHandling: string;
      descending: boolean;
      ascending: boolean;
    }
  ];
  numberOfElements: number;
  size: number;
  number: number;
}

// month,desc
export interface SortParam {
  field: string;
  desc?: boolean;
}

export interface SearchCompanyHistoryByFieldParams {
  dc?: number;
  measureCode: MeasureCode;
  codes: number;
  monthFrom: string;
  monthTo: string;
}

export enum MeasureCode {
  // eslint-disable-next-line no-unused-vars
  AVG_WAGE = 'AVG_WAGE',
  // eslint-disable-next-line no-unused-vars
  NUM_INSURED = 'NUM_INSURED',
}

export type SearchCompanyHistoryByFieldResponse = { time: string; val1?: any }[];

export interface SearchCompaniesOptions {
  makeGetRequest?: (fullUrl: string) => Promise<{ status: number; body: object }>;
}
