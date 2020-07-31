/* eslint-disable no-unused-vars */
import fetch from 'node-fetch';
import { SearchCompanyHistoryByFieldParams, SearchCompanyHistoryByFieldResponse } from './companies.api.types';
import type {
  CompaniesResponse,
  SearchCompaniesOptions,
  SearchCompaniesParams,
  SearchCompanyHistoryFullParams,
  CompaniesHistoryFullResponse,
} from './companies.api.types';

const SODRA_API_BASE = 'https://atvira.sodra.lt';
const SODRA_API = `${SODRA_API_BASE}/imones-rest/solr/page`;
const SODRA_API_MONTHLY_FULL = `${SODRA_API_BASE}/imones-rest/values/monthly/page`;
const SODRA_API_MONTHLY_FIELD = `${SODRA_API_BASE}/imones-rest/charts/measure/values/list`;

/**
 * Search for companies within Open Sodra database
 *
 * @param {object} params - search parameters
 * @param {string} params.text - search text, could be company name, jarCode, anything...
 * @param {number} [params.minAvgWage] - filter by min average salary
 * @param {number} [params.maxAvgWage] - filter by max average salary
 * @param {number} [params.minNumInsured] - filter by min employee count
 * @param {number} [params.maxNumInsured] - filter by max employee count
 * @param {string} [params.municipality] - municipality code
 * @param {string} [params.evrk] - EVRK code
 * @param {number} [params.start] - page number (starts with 0)
 * @param {number} [params.size] - page size (max 2000)
 *
 * @param {object} options - additional options
 */
export async function searchCompanies(
  params: SearchCompaniesParams = {},
  options: SearchCompaniesOptions = {}
): Promise<CompaniesResponse> {
  const qs = (Object.keys(params) as Array<keyof SearchCompaniesParams>)
    .map((key) => {
      if (key === 'sort') {
        return (params.sort || []).map((sort) => `sort=${sort.field},${sort.desc ? 'DESC' : 'ASC'}`).join('&');
      }
      return `${key}=${params[key]}`;
    })
    .join('&');

  const fullUrl = `${SODRA_API}?${qs}`;
  const res = await wrapGetRequest(options, fullUrl);
  return res.body as CompaniesResponse;
}

/**
 * Fetch Historical data for companies
 *
 * @param {object} params - search parameters
 * @param {object} options - additional options
 */
export async function searchCompanyHistoryFull(
  params: SearchCompanyHistoryFullParams = {},
  options: SearchCompaniesOptions = {}
): Promise<CompaniesHistoryFullResponse> {
  const qs = (Object.keys(params) as Array<keyof SearchCompanyHistoryFullParams>)
    .map((key) => {
      if (key === 'sort') {
        return (params.sort || []).map((sort) => `sort=${sort.field},${sort.desc ? 'DESC' : 'ASC'}`).join('&');
      }
      return `${key}=${params[key]}`;
    })
    .join('&');

  const fullUrl = `${SODRA_API_MONTHLY_FULL}?${qs}`;
  const res = await wrapGetRequest(options, fullUrl);
  return res.body as CompaniesHistoryFullResponse;
}

/**
 * Fetch Historical data for companies
 *
 * @param {object} params - search parameters
 * @param {object} options - additional options
 */
export async function searchCompanyHistoryByField(
  params: SearchCompanyHistoryByFieldParams,
  options: SearchCompaniesOptions = {}
): Promise<SearchCompanyHistoryByFieldResponse> {
  const qs = (Object.keys(params) as Array<keyof SearchCompanyHistoryByFieldParams>)
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  const fullUrl = `${SODRA_API_MONTHLY_FIELD}?${qs}`;
  const res = await wrapGetRequest(options, fullUrl);
  return res.body as SearchCompanyHistoryByFieldResponse;
}

async function wrapGetRequest(options: SearchCompaniesOptions, fullUrl: string) {
  let res;
  if (options.makeGetRequest) {
    res = await options.makeGetRequest(fullUrl);
  } else {
    res = await makeGetRequestDefault(fullUrl);
  }

  if (!res) {
    throw new Error('Empty response');
  }
  if (res.status < 200 || res.status >= 400) {
    throw res;
  }
  return res;
}

const makeGetRequestDefault: (fullUrl: string) => Promise<{ status: number; body: object }> = async (fullUrl) => {
  const res = await fetch(fullUrl, {
    method: 'get',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  if (!res || !res.body) {
    throw new Error('Something wen wrong with request');
  }
  const body = await res.json();

  return {
    status: res.status,
    body,
  };
};
