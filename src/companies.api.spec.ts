import { searchCompanies } from './companies.api';
// eslint-disable-next-line no-unused-vars
import { CompaniesResponse } from './companies.api.types';

describe('companies.api', () => {
  describe('searchCompanies', () => {
    it('should work out of the box', async () => {
      const res = await searchCompanies({
        text: 'statyba',
      });

      expect(res.content.length).toBeGreaterThan(1);
    });

    it('should support custom HTTP GET request function', async () => {
      const fakeResponse: CompaniesResponse = {
        content: [
          {
            id: 111,
            code: 111222,
            jarCode: '',
            name: 'STATYBA!!!',
            nameSearch: 'STATYBA!!!',
            shortname: 'STATYBA!!!',
            lastAvgWage: null,
            lastNumInsured: null,
            lastTax: null,
            month: null,
            evrk: null,
            evrkName: null,
            muni: 13,
            muniName: 'Vilniaus m. sav.',
          },
        ],
        facetResultPages: [],
        facetQueryResult: {
          content: [],
          last: true,
          totalPages: 1,
          totalElements: 0,
          first: true,
          sort: null,
          numberOfElements: 0,
          size: 0,
          number: 0,
        },
        highlighted: [],
        maxScore: null,
        fieldStatsResults: {},
        suggestions: [],
        facetFields: [],
        facetPivotFields: [],
        allFacets: [null],
        alternatives: [],
        totalPages: 248,
        totalElements: 4954,
        last: false,
        first: true,
        sort: null,
        numberOfElements: 20,
        size: 20,
        number: 0,
      };

      const res = await searchCompanies(
        {
          text: 'statyba',
        },
        {
          // eslint-disable-next-line no-unused-vars
          makeGetRequest: (_fullUrl: string) =>
            Promise.resolve({
              status: 200,
              body: fakeResponse,
            }),
        }
      );

      expect(res).toEqual(fakeResponse);
    });
  });
});
