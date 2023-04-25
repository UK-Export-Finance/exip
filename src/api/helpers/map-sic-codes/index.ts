import { CompanyResponse, SicCodes } from '../../types';

/**
 * maps sic codes from response and adds to an array to add to the database
 * @param {CompanyResponse} company
 * @param {Array<string>} sicCodes
 * @param {Array<string>} industrySectorNames
 * @returns {Array} sicCodesToAdd
 */
const mapSicCodes = (company: CompanyResponse, sicCodes?: Array<string>, industrySectorNames?: Array<string>) => {
  const mapped = [] as Array<SicCodes>;

  if (!sicCodes || !sicCodes.length) {
    return mapped;
  }

  sicCodes.forEach((code, index) => {
    let industrySectorName = '';

    // if industrySectorNames has value at index, then add it to the object
    if (industrySectorNames && industrySectorNames[index]) {
      industrySectorName = industrySectorNames[index];
    }

    const codeToAdd = {
      sicCode: code,
      industrySectorName,
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
