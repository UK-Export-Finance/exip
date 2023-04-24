import { CompanyResponse, SicCodes } from '../../types';

/**
 * maps sic codes from response and adds to an array to add to the database
 * @param {CompanyResponse} company
 * @param {Array<string>} sicCodes
 * @param {Array<string>} sicCodeDescriptions
 * @returns {Array} sicCodesToAdd
 */
const mapSicCodes = (company: CompanyResponse, sicCodes?: Array<string>, sicCodeDescriptions?: Array<string>) => {
  const mapped = [] as Array<SicCodes>;

  if (!sicCodes || !sicCodes.length) {
    return mapped;
  }

  sicCodes.forEach((code, index) => {
    let sicCodeDescription = '';

    // if sicCodeDescriptions has value at index, then add it to the database
    if (sicCodeDescriptions && sicCodeDescriptions[index]) {
      sicCodeDescription = sicCodeDescriptions[index];
    }

    const codeToAdd = {
      sicCode: code,
      industrySectorName: sicCodeDescription,
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
