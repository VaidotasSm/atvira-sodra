/**
 * Parse files from https://atvira.sodra.lt/imones/rinkiniai/index.html
 *
 * Experimental for now:
 *  - Some data is missing some fields
 *  - Performance is not up there yet
 */
import fs from 'fs';
import es from 'event-stream';
import { csv2jsonAsync } from 'json-2-csv';

const getLine: any = require('get-line');

const getLines = getLine({
  lines: [1],
  encoding: 'utf8',
});

/**
 * Parse Historical Data CSVs provided in https://atvira.sodra.lt/imones/rinkiniai/index.html
 *
 * Experimental: Historical Data CSVs seem to be missing some fields like salary averages
 */
export async function parseCompaniesCsv(
  csvFilePath: string,
  filterIn: (json: CompanyParseContent) => boolean
): Promise<CompanyParseContent[]> {
  const firstLine = await readFirstLine(csvFilePath);
  const results = await readLines(csvFilePath, firstLine, filterIn);
  return results;
}

function readLines(
  csvFilePath: string,
  firstCsvLine: string,
  filterIn?: (json: CompanyParseContent) => boolean
): Promise<CompanyParseContent[]> {
  const results: any[] = [];

  return new Promise((resolve) => {
    fs.createReadStream(csvFilePath, { flags: 'r' })
      .pipe(es.split())
      .pipe(
        es
          // eslint-disable-next-line array-callback-return
          .map((line: string, cb: any) => {
            if (firstCsvLine.startsWith(line)) {
              cb(); // skip
              return;
            }

            csvToJson(`${firstCsvLine}${line}`)
              .then((json) => {
                if (filterIn && !filterIn(json)) {
                  cb(); // skip
                  return;
                }
                results.push(json);
                cb(null, line);
              })
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);
                cb(); // skip
                return null;
              });
          })
          .on('end', () => {
            resolve(results);
          })
      );
  });
}

export interface CompanyParseContent {
  code: number;
  evrk: any;
  evrkName: string | null;
  jarCode: number | null;
  lastNumInsured: number | null;
  month: number | null;
  muniName: string;
  name: string;
  // TODO
  // lastAvgWage: number | null;
  // lastTax: number | null;
  // muni: number | null;
  // nameSearch: string;
  // shortname: string;
}

async function csvToJson(csvText: string): Promise<CompanyParseContent> {
  const res: any = await csv2jsonAsync(csvText, {
    delimiter: {
      field: ';',
    },
  });
  if (!res || res.length !== 1) {
    throw new Error('CSV parsing should produce one record');
  }

  let month = null;
  if (res[0]['Data (date)']) {
    const dateElements = (res[0]['Data (date)'] as string).split('-');
    dateElements.pop();
    month = Number(dateElements.join(''));
  }
  const companyResp: CompanyParseContent = {
    code: res[0]['Draudėjo kodas (code)'],
    jarCode: res[0]['Juridinių asmenų registro kodas (jarCode)'],
    name: res[0]['Pavadinimas (name)'],
    muniName: res[0]['Savivaldybė, kurioje registruota(municipality)'],
    evrk: res[0]['Ekonominės veiklos rūšies kodas(ecoActCode)'],
    evrkName: res[0]['Ekonominės veiklos rūšies pavadinimas(ecoActName)'],
    lastNumInsured: res[0]['Apdraustųjų skaičius (numInsured)'],
    month,
    // TODO
    // : 'Skola Sodrai(debt)',
    // : 'Atidėta skola Sodrai(deferredDebt)',
  };
  return companyResp;
}

function readFirstLine(csvFilePath: string): Promise<string> {
  return new Promise((resolve) =>
    fs
      .createReadStream(csvFilePath, { flags: 'r' })
      .pipe(getLines)
      .pipe(
        es.map((line: string, next: any) => {
          next(null, line);
          return resolve(line);
        })
      )
  );
}
