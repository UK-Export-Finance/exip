import { CompanyResponse, SicCode } from '../../types';

/**
 * maps sic codes from response and adds to an array to add to the database
 * @param {CompanyResponse} company
 * @param {Array<string>} sicCodes
 * @param {Array<string>} industrySectorNames
 * @returns {Array} sicCodesToAdd
 */
const mapSicCodes = (company: CompanyResponse, sicCodes?: Array<string>, industrySectorNames?: Array<string>) => {
  const mapped = [] as Array<SicCode>;

  if (!sicCodes?.length) {
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
      company: {
        connect: {
          id: company.id,
        },
      },
    } as SicCode;

    mapped.push(codeToAdd);
  });

  return mapped;
};

export { mapSicCodes, CompanyResponse };
