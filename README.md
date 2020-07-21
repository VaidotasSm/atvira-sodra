# atvira-sodra
API wrapper and tools for https://atvira.sodra.lt

# Documentation

**CompaniesAPI.searchCompanies**

Search for companies by different params

Usage Examples:

```JavaScript
// Option 1 - use default HTTP call
const res = await CompaniesAPI.searchCompanies({
  text: 'statyba',
});

// Option 2 - use custom HTTP call
const res = await CompaniesAPI.searchCompanies(
  { text: 'statyba' },
  {
    makeGetRequest: (fullUrl: string) => {
      ...
      return Promise.resolve({
        status, // e.g. 200
        body, // response body
      }),
    }
  }
);
```

CompaniesAPI.searchCompanies parameters:

```JavaScript
{string} params.text - search text, could be company name, jarCode, anything...
{number} [params.minAvgWage] - filter by min average salary
{number} [params.maxAvgWage] - filter by max average salary
{number} [params.minNumInsured] - filter by min employee count
{number} [params.maxNumInsured] - filter by max employee count
{string} [params.municipality] - municipality code
{string} [params.evrk] - EVRK code
{number} [params.start] - page number (starts with 0)
{number} [params.size] - page size (max 2000)
```
