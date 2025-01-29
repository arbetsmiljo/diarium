import { readDocument, writeDocument } from "./database";
import { fetchDiariumDocument } from "./document";
import { DiariumPage, fetchDiariumPage } from "./pagination";
import ora from "ora-classic";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function ingestDiariumDay(
  date: string,
  filename: string,
  ms = 1000,
) {
  let pageNumber = 1;
  let page: DiariumPage;

  do {
    let pageSpinner = ora(` Page ${pageNumber}`).start();
    page = await fetchDiariumPage(date, pageNumber);
    await delay(ms);
    pageSpinner.succeed(
      ` Page ${page.number}: ${page.start} - ${page.end} of ${page.total}`,
    );

    for (let i = 0; i < page.documents.length; i++) {
      const { id } = page.documents[i];
      const documentSpinner = ora(` ${id}`).start();
      await delay(ms);
      const document = await fetchDiariumDocument(id);
      const existingDocument = await readDocument(filename, id);
      if (existingDocument) {
        documentSpinner.warn(` ${document.id}: Already exists`);
        continue;
      }
      await writeDocument(filename, document);
      documentSpinner.succeed(
        ` ${document.id}: ${document.documentType} ${document.companyName ? `(${document.companyName})` : ""}`,
      );
    }

    pageNumber += 1;
  } while (page.end < page.total);
}
