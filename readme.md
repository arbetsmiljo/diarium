# diarium

SQLite & web scraper tooling for work environment data

## Modules

| Module | Description |
| --- | --- |
| [Case](https://arbetsmiljo.github.io/diarium/modules/case.html) | Referred to as an "ärende" by Arbetsmiljöverket. Each case contains one or more documents. Cases may also optionally have one company, county, municipality, and workplace. Many cases have all of these. Some have none. |
| [Company](https://arbetsmiljo.github.io/diarium/modules/company.html) | Referred to as either a "företag" or an "organisation" by Arbetsmiljöverket. |
| [County](https://arbetsmiljo.github.io/diarium/modules/county.html) | This is a "län" in Swedish. Sweden has 21 counties and Arbetsmiljöverket's data allows for a few other special cases outside that 21. Not all cases are associated with a county. |
| [Database](https://arbetsmiljo.github.io/diarium/modules/database.html) | Code related to SQLite3 lives here. That means all the logic for reading from and writing to the database. |
| [Document](https://arbetsmiljo.github.io/diarium/modules/document.html) | Documents are the protagonists of the diarium data model. Another appropriate English word for them would be "filings". Arbetsmiljöverket refers to them as "handlingar" in Swedish. |
| [Ingestion](https://arbetsmiljo.github.io/diarium/modules/ingestion.html) | High-level orchestration of several other modules is managed here in order to ingest Arbetsmiljöverket's data into SQLite. |
| [Municipality](https://arbetsmiljo.github.io/diarium/modules/municipality.html) | This is a "kommun" in Swedish. There are 290 of these in Sweden. Just like with counties, Arbetsmiljöverket have a few special case values here outside the canonical 290 municipalities that actually exist in real life. |
| [Pagination](https://arbetsmiljo.github.io/diarium/modules/pagination.html) | The web search results on Arbetsmiljöverket's site are paginated. This is the code for paging through those results to determine what documents exist for a given date. |
| [Time](https://arbetsmiljo.github.io/diarium/modules/time.html) | What project is complete without a junk drawer of utility functions for date and time operations? |
| [Workplace](https://arbetsmiljo.github.io/diarium/modules/workplace.html) | Referred to as an "arbetsplats" by Arbetsmiljöverket. Less interesting for companies with a single office or warehouse. More interesting in cases such as city ocuncils where one company might encompass hundreds of workplaces such as schools. |

## License

[MIT](https://github.com/arbetsmiljo/diarium/blob/main/license)
