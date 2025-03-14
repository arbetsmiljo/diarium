import z from "zod";

/**
 * Normally a Swedish company ID has to be 10 characters, with an optional
 * hyphen separator between characters 6 and 7. So valid examples would be:
 *
 * 1. 555666-1234
 * 2. 4445551234
 *
 * In practice Arbetsmiljöverket's data isn't this reliable and sometimes
 * there can be a typo or invalid data here. Here are some of the invalid
 * company IDs observed so far in the data.
 *
 * 1. An extra number – 44455512349 – presumably a typo.
 * 2. VAT numbers instead of actual company IDs. So e.g. "012345678901".
 * 3. Somebody's name, i.e. "PatrikVernersson".
 * 4. The number "2" on its own (2024/016058-1).
 * 5. "UlfBemler" (2024/033802-1).
 * 6. "24838560" (2024/038886-1).
 * 7. "769079941" (2024/058952-1).
 * 8. "556417" (2024/060133-1).
 * 9. "212000183" (2024/071264-1).
 * 10. Personnummer (2024/074000-1).
 * 11. "559015-265755901" (2022/027528-1).
 * 12. "559015265755901" (2022/027528-1).
 * 13. "556646191" (2022/020907-1).
 * 14. "2120003005)" (2022/014878-1).
 * 15. "StaffanBergström" (2022/009215-1).
 *
 * Validation has been abandoned on this field.
 */
export const CompanyIdSchema = z.string().transform((val) => {
  if (val) {
    if (val.includes("-")) {
      return val.split("-").join("");
    }
    if (val.includes("")) {
      return val.split("").join("");
    }
  }
  return val;
});

/**
 * Any string value is valid as a company name. Most of them end with ` AB` but
 * I haven't bothered to check if it's 100%. Doesn't seem important to lock this
 * down.
 */
export const CompanyNameSchema = z.string();
