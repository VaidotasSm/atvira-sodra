import path from 'path';
import { parseCompaniesCsv } from './companies.parser';

describe('companies.parser', () => {
  describe('parseCompaniesCsv', () => {
    it('should parse csv', async () => {
      const filePath = path.join(__dirname, '..', 'src/resources/', 'companies.csv');
      const results = await parseCompaniesCsv(filePath, (json) => json.jarCode === 303369920);
      expect(results.length).toBe(5);
    });
  });
});
