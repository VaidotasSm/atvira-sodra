/* eslint-disable no-unused-vars */
import { searchCompanyHistoryFull, searchCompanies } from './companies.api';
import { CompaniesHistoryResponseContent } from './companies.api.types';

// type FetchCompaniesHistoryResults = { [key: number]: CompaniesHistoryResponseContent[] };
export interface FetchCompaniesHistoryResults {
  [key: number]: CompanyHistoryRecord;
}

export interface CompanyHistoryRecord {
  history: CompaniesHistoryResponseContent[];
  totalElements: number;
}

export async function fetchCompaniesHistory(
  codes: number[],
  historyLengthMonths: number = 1
): Promise<FetchCompaniesHistoryResults> {
  if (!codes.length) {
    return {};
  }

  const results: FetchCompaniesHistoryResults = {};
  for (const code of codes) {
    const res = await searchCompanyHistoryFull({
      codes: code,
      sort: [{ field: 'month', desc: true }],
      size: historyLengthMonths,
      start: 0,
    });

    results[code] = {
      history: res.content,
      totalElements: res.totalElements,
    };
  }

  return results;
}

export async function fromJarCodesToCodes(jarCodes: number[]): Promise<{ [key: number]: number | undefined }> {
  const result: { [key: number]: number | undefined } = {};
  for (const jarCode of jarCodes) {
    const res = await searchCompanies({
      text: `${jarCode}`,
    });

    result[jarCode] = res.content.find((comp) => comp.jarCode === `${jarCode}`)?.code;
  }

  return result;
}
