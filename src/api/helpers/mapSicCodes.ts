import { CompanyResponse, SicCodes } from '../types';

/**
 * maps sic codes from response and adds to an array to add to the database
 * @param {CompanyResponse} company
 * @param {Array} sicCodes
 * @returns {Array} sicCodesToAdd
 */
const mapSicCodes = (company: CompanyResponse, sicCodes?: Array<string>) => {
  const mapped = [] as Array<SicCodes>;

  if (!sicCodes || !sicCodes.length) {
    return mapped;
  }

  sicCodes.forEach((code) => {
    const codeToAdd = {
      sicCode: code,
      exporterCompany: {
        connect: {
          id: company.id,
        },
      },
    } as SicCodes;

    mapped.push(codeToAdd);
  });

  return mapped;
};

export { mapSicCodes, CompanyResponse, SicCodes };
