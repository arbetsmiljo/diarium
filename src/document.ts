import { JSDOM } from "jsdom";
import _ from "lodash";
import fetch from "node-fetch";
import z from "zod";

export type DiariumDocumentOrigin = "Inkommande" | "Utgående";

export type DiariumDocumentType =
  | "Anbud (vinnande)"
  | "Anbud (övriga)"
  | "Anbudsförfrågan/offertförfrågan"
  | "Anmälan"
  | "Anmälan av byggarbetsplats"
  | "Anmälan om dödsfall"
  | "Anmälan om miljöfarlig verksamhet (Kännedomskopia)"
  | "Anmälan om misstänkt missförhållande på arbetsplats"
  | "Anmälan om olycka"
  | "Anmälan om tillbud"
  | "Anmälan om uppställning av mobilt krossverk"
  | "Anmälan om utstationering"
  | "Anmälan till kommissionen"
  | "Anmälan, asbest"
  | "Anmälan, rapport från medicinsk kontroll"
  | "Anmälan, rapport från yrkeshygienisk mätning"
  | "Anmälan, smittämnen"
  | "Anmälan,Säkerhetsrapport/Tillsynsprogram från miljöfarlig verksamhet/SEVESO"
  | "Annons"
  | "Anskaffningsbeslut"
  | "Ansökan"
  | "Ansökan om att inkassera avgift"
  | "Ansökan om påförande av avgift"
  | "Ansökan om vitesutdömande"
  | "Arbetsmiljöverkets författningssamling"
  | "Avgiftsföreläggande"
  | "Avtal"
  | "Begäran från skyddsombud om ingripande"
  | "Begäran om avtalsjustering"
  | "Begäran om förlängd svarstid"
  | "Begäran om kompletterande uppgifter"
  | "Begäran om komplettering"
  | "Begäran om yttrande"
  | "Begäran/Förfrågan om uppgifter/synpunkter"
  | "Behovsanalys/marknadsanalys"
  | "Bekräftelse/Svar/Uppmaning till uppgiftslämnare"
  | "Beslut"
  | "Beslut om att avvisa skyddsombudets begäran"
  | "Beslut om att inte meddela omedelbart förbud"
  | "Beslut om att ärende avslutas (avslutsbrev)"
  | "Beslut om avbruten upphandling"
  | "Beslut om avskrivning av skyddsombudets begäran"
  | "Beslut om avslag av skyddsombudets begäran"
  | "Beslut om avvisning"
  | "Beslut om förbud med vite"
  | "Beslut om förbud utan vite"
  | "Beslut om föreläggande med vite"
  | "Beslut om föreläggande utan vite"
  | "Beslut om prövningstillstånd"
  | "Beslut om slutligt omedelbart förbud"
  | "Beslut om tillfälligt omedelbart förbud"
  | "Beslut om upphävande av tillfälligt förbud"
  | "Beslut om ändring"
  | "Beslut rörande begäran om förlängd svarstid"
  | "Dokumenterad bedömning inklusive brister och krav"
  | "Dom"
  | "Dom/beslut"
  | "Faktaunderlag"
  | "Frågor från anbudsgivare och information till anbudsgivare"
  | "Föranmälan"
  | "Föreskriftsförslag Externt"
  | "Föreskriftsförslag Internt"
  | "Förfrågan/Information om inträffad arbetsolycka"
  | "Förlängd svarstid - Begäran/beslut"
  | "Förlängning av avtal"
  | "Förrättningsprotokoll"
  | "Förstudierapport"
  | "Förändring av avtal (justering eller tillägg)"
  | "Inbjudan att lämna intresseanmälan"
  | "Information om att ärende avslutas"
  | "Information ur e-skada"
  | "Information ur RAPEX/ICSMS"
  | "Inspektionsmeddelande"
  | "Intresseanmälan"
  | "Intyg återkommande besiktning"
  | "Kallelse"
  | "Kompletterande uppgifter"
  | "Komplettering"
  | "Konsekvensutredning/beslut om att ingen behövs"
  | "Kvittens"
  | "Meddelande om att Arbetsmiljöverket godtagit invändningarna"
  | "Meddelande om skyddsombudsstopp"
  | "Missiv till domstol"
  | "Mötesanteckningar"
  | "Notifiering"
  | "Omprövningsrapport"
  | "Parallelluppställning"
  | "Påminnelse"
  | "Rapport"
  | "Rapport - utredning, olycksfall, tillbud"
  | "Registrerat besök"
  | "Sammanställning av inkomna externa remissvar"
  | "Skyddsombudets återkallande av begäran"
  | "Svar på avgiftsföreläggande"
  | "Svar på kravskrivelse"
  | "Svar/synpunkter på föreskriftsförslag Externt"
  | "Svar/synpunkter på föreskriftsförslag Internt"
  | "Tilldelningsbeslut"
  | "Tillsynsmeddelande"
  | "Tips från annan myndighet om misstänkt missförhållande på arbetsplats"
  | "Tips om misstänkt missförhållande på arbetsplats"
  | "Tjänsteanteckning"
  | "Trycklov"
  | "Underrättelse"
  | "Underrättelse om föreläggande/förbud"
  | "Uppdragsdirektiv/plan"
  | "Uppföljning av krav"
  | "Uppgifter/synpunkter"
  | "Upphandlingsprotokoll (utvärdering)"
  | "Uppsägning av avtal"
  | "Vidarebefordran till annan aktör"
  | "Yttrande"
  | "Återtagande av ansökan"
  | "Öppningsprotokoll"
  | "Överklagande"
  | "Övrig korrespondens (frågor/svar/synpunkter/info)"
  | "Övriga handlingar - Avgiftsutdömande"
  | "Övriga handlingar - Överklagande"
  | "Övriga handlingar administrera anskaffning"
  | "Övriga handlingar inspektion";

export type DiariumDocument = {
  id: string;
  documentDate: string;
  documentOrigin: DiariumDocumentOrigin;
  documentType: DiariumDocumentType;
  caseCode: string;
  caseName: string;
  caseSubject: string;
  companyCode?: string;
  companyName?: string;
  workplaceCode?: string;
};

export const DiariumDocumentSchema = z.object({
  id: z.string(),
  documentDate: z.string(),
  documentOrigin: z.union([z.literal("Inkommande"), z.literal("Utgående")]),
  documentType: z.union([
    z.literal("Anbud (vinnande)"),
    z.literal("Anbud (övriga)"),
    z.literal("Anbudsförfrågan/offertförfrågan"),
    z.literal("Anmälan"),
    z.literal("Anmälan av byggarbetsplats"),
    z.literal("Anmälan om dödsfall"),
    z.literal("Anmälan om miljöfarlig verksamhet (Kännedomskopia)"),
    z.literal("Anmälan om misstänkt missförhållande på arbetsplats"),
    z.literal("Anmälan om olycka"),
    z.literal("Anmälan om tillbud"),
    z.literal("Anmälan om uppställning av mobilt krossverk"),
    z.literal("Anmälan om utstationering"),
    z.literal("Anmälan till kommissionen"),
    z.literal("Anmälan, asbest"),
    z.literal("Anmälan, rapport från medicinsk kontroll"),
    z.literal("Anmälan, rapport från yrkeshygienisk mätning"),
    z.literal("Anmälan, smittämnen"),
    z.literal(
      "Anmälan,Säkerhetsrapport/Tillsynsprogram från miljöfarlig verksamhet/SEVESO",
    ),
    z.literal("Annons"),
    z.literal("Anskaffningsbeslut"),
    z.literal("Ansökan"),
    z.literal("Ansökan om att inkassera avgift"),
    z.literal("Ansökan om påförande av avgift"),
    z.literal("Ansökan om vitesutdömande"),
    z.literal("Arbetsmiljöverkets författningssamling"),
    z.literal("Avgiftsföreläggande"),
    z.literal("Avtal"),
    z.literal("Begäran från skyddsombud om ingripande"),
    z.literal("Begäran om avtalsjustering"),
    z.literal("Begäran om förlängd svarstid"),
    z.literal("Begäran om kompletterande uppgifter"),
    z.literal("Begäran om komplettering"),
    z.literal("Begäran om yttrande"),
    z.literal("Begäran/Förfrågan om uppgifter/synpunkter"),
    z.literal("Behovsanalys/marknadsanalys"),
    z.literal("Bekräftelse/Svar/Uppmaning till uppgiftslämnare"),
    z.literal("Beslut"),
    z.literal("Beslut om att avvisa skyddsombudets begäran"),
    z.literal("Beslut om att inte meddela omedelbart förbud"),
    z.literal("Beslut om att ärende avslutas (avslutsbrev)"),
    z.literal("Beslut om avbruten upphandling"),
    z.literal("Beslut om avskrivning av skyddsombudets begäran"),
    z.literal("Beslut om avslag av skyddsombudets begäran"),
    z.literal("Beslut om avvisning"),
    z.literal("Beslut om förbud med vite"),
    z.literal("Beslut om förbud utan vite"),
    z.literal("Beslut om föreläggande med vite"),
    z.literal("Beslut om föreläggande utan vite"),
    z.literal("Beslut om prövningstillstånd"),
    z.literal("Beslut om slutligt omedelbart förbud"),
    z.literal("Beslut om tillfälligt omedelbart förbud"),
    z.literal("Beslut om upphävande av tillfälligt förbud"),
    z.literal("Beslut om ändring"),
    z.literal("Beslut rörande begäran om förlängd svarstid"),
    z.literal("Dokumenterad bedömning inklusive brister och krav"),
    z.literal("Dom"),
    z.literal("Dom/beslut"),
    z.literal("Faktaunderlag"),
    z.literal("Frågor från anbudsgivare och information till anbudsgivare"),
    z.literal("Föranmälan"),
    z.literal("Föreskriftsförslag Externt"),
    z.literal("Föreskriftsförslag Internt"),
    z.literal("Förfrågan/Information om inträffad arbetsolycka"),
    z.literal("Förlängd svarstid - Begäran/beslut"),
    z.literal("Förlängning av avtal"),
    z.literal("Förrättningsprotokoll"),
    z.literal("Förstudierapport"),
    z.literal("Förändring av avtal (justering eller tillägg)"),
    z.literal("Inbjudan att lämna intresseanmälan"),
    z.literal("Information om att ärende avslutas"),
    z.literal("Information ur e-skada"),
    z.literal("Information ur RAPEX/ICSMS"),
    z.literal("Inspektionsmeddelande"),
    z.literal("Intresseanmälan"),
    z.literal("Intyg återkommande besiktning"),
    z.literal("Kallelse"),
    z.literal("Kompletterande uppgifter"),
    z.literal("Komplettering"),
    z.literal("Konsekvensutredning/beslut om att ingen behövs"),
    z.literal("Kvittens"),
    z.literal("Meddelande om att Arbetsmiljöverket godtagit invändningarna"),
    z.literal("Meddelande om skyddsombudsstopp"),
    z.literal("Missiv till domstol"),
    z.literal("Mötesanteckningar"),
    z.literal("Notifiering"),
    z.literal("Omprövningsrapport"),
    z.literal("Parallelluppställning"),
    z.literal("Påminnelse"),
    z.literal("Rapport"),
    z.literal("Rapport - utredning, olycksfall, tillbud"),
    z.literal("Registrerat besök"),
    z.literal("Sammanställning av inkomna externa remissvar"),
    z.literal("Skyddsombudets återkallande av begäran"),
    z.literal("Svar på avgiftsföreläggande"),
    z.literal("Svar på kravskrivelse"),
    z.literal("Svar/synpunkter på föreskriftsförslag Externt"),
    z.literal("Svar/synpunkter på föreskriftsförslag Internt"),
    z.literal("Tilldelningsbeslut"),
    z.literal("Tillsynsmeddelande"),
    z.literal(
      "Tips från annan myndighet om misstänkt missförhållande på arbetsplats",
    ),
    z.literal("Tips om misstänkt missförhållande på arbetsplats"),
    z.literal("Tjänsteanteckning"),
    z.literal("Trycklov"),
    z.literal("Underrättelse"),
    z.literal("Underrättelse om föreläggande/förbud"),
    z.literal("Uppdragsdirektiv/plan"),
    z.literal("Uppföljning av krav"),
    z.literal("Uppgifter/synpunkter"),
    z.literal("Upphandlingsprotokoll (utvärdering)"),
    z.literal("Uppsägning av avtal"),
    z.literal("Vidarebefordran till annan aktör"),
    z.literal("Yttrande"),
    z.literal("Återtagande av ansökan"),
    z.literal("Öppningsprotokoll"),
    z.literal("Överklagande"),
    z.literal("Övrig korrespondens (frågor/svar/synpunkter/info)"),
    z.literal("Övriga handlingar - Avgiftsutdömande"),
    z.literal("Övriga handlingar - Överklagande"),
    z.literal("Övriga handlingar administrera anskaffning"),
    z.literal("Övriga handlingar inspektion"),
  ]),

  caseCode: z.string(),
  caseName: z.string(),
  caseSubject: z.string(),
  companyCode: z.string().optional(),
  companyName: z.string().optional(),
  workplaceCode: z.string().optional(),
});

const trim = (text: string | null) =>
  _.trim(_.replace(text || "", /\s+/g, " "));

const dl = (root: Element): Record<string, string> =>
  [...root.querySelectorAll("dl")].reduce(
    (result: Record<string, string>, dl) => {
      [...dl.querySelectorAll("dt")].forEach((dt, i) => {
        const dd = dl.querySelectorAll("dd")[i];
        const key = trim(dt.textContent);
        const value = trim(
          dd.querySelector("a")?.textContent || dd.textContent,
        );
        result[key] = value;
      });
      return result;
    },
    {},
  );

const optional = (text: string | null) =>
  text ? (trim(text).toLowerCase() === "saknas" ? undefined : text) : undefined;

/**
 * Fetch metadata about a document from the Arbetsmiljöverket website.
 */
export async function fetchDocument(id: string): Promise<DiariumDocument> {
  const baseUrl = `https://www.av.se/om-oss/diarium-och-allmanna-handlingar/bestall-handlingar/Case/?id=`;
  const caseCode = id.split("-")[0];
  const caseUrl = `${baseUrl}${caseCode}`;
  const response = await fetch(caseUrl, {
    headers: {
      Cookie: "cookieacceptpreferences=0%2c1;",
    },
  });
  const html = await response.text();

  const document = new JSDOM(html).window.document;
  const article = [...document.querySelectorAll("article")].find((a) =>
    a.querySelector("h3")?.textContent?.includes(id),
  );

  if (!article) {
    throw new Error(`Document ${id} not found`);
  }

  const definitions = dl(article);
  const documentDate = definitions["Handlingens datum"];
  const documentOrigin = definitions["Handlingens ursprung"];
  const documentType = definitions["Handlingstyp"];

  const h1 = document.querySelector("h1");
  if (!h1) {
    throw new Error(`Document ${id} missing h1`);
  }
  const caseName = trim(h1.textContent);

  const caseContainer = h1?.parentElement!.parentElement!;
  const caseDefinitions = dl(caseContainer);
  const caseSubject = caseDefinitions["Ämnesområde"];
  const companyCode = optional(caseDefinitions["Organisationsnummer"]);
  const companyName = optional(caseDefinitions["Företag/organisation"]);
  const workplaceCode = optional(caseDefinitions["Arbetsställenummer (CFAR)"]);

  const unvalidatedDocument = {
    id,
    documentDate,
    documentOrigin,
    documentType,
    caseCode,
    caseName,
    caseSubject,
    companyCode,
    companyName,
    workplaceCode,
  };

  const validatedDocument = DiariumDocumentSchema.parse(unvalidatedDocument);

  return validatedDocument;
}
