#!/usr/bin/env node

import { Command } from "commander";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { createDatabase, readDocument, writeDocument } from "@/database";
import { fetchDocument } from "@/document";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(readFileSync(`${__dirname}/../package.json`, "utf8"));

const program = new Command();
program.name(pkg.name).description(pkg.description).version(pkg.name);

program
  .command("createDatabase")
  .description("Create a new blank database")
  .option("-f, --filename <filename>", "database filename", "db.sqlite")
  .action(async ({ filename }) => {
    await createDatabase(filename);
  });

program
  .command("fetchDocument")
  .description("Fetch document metadata")
  .argument("<id>", "Document ID")
  .action(async (id) => {
    const data = await fetchDocument(id);
    process.stdout.write(`${JSON.stringify(data, null, 2)}\n`);
  });

program
  .command("readDocument")
  .option("-f, --filename <filename>", "database filename", "db.sqlite")
  .argument("<id>", "Document ID")
  .action(async (id, { filename }) => {
    const document = await readDocument(filename, id);
    console.log(JSON.stringify(document, null, 2));
  });

program
  .command("writeDocument")
  .option("-f, --filename <filename>", "database filename", "db.sqlite")
  .action(async ({ filename }) => {
    const input = readFileSync(0, "utf8");
    const document = JSON.parse(input);
    await writeDocument(filename, document);
  });

program.parse(process.argv);
