import { SicCode } from '../../types';

/**
 * mapSicCodes
 * Map SIC codes and industry sector names with a company ID.
 * @param {Array<string>} sicCodes
 * @param {Array<string>} industrySectorNames
 * @param {String} companyId
 * @returns {Array} Mapped SIC codes
 */
const mapSicCodes = (sicCodes: Array<string>, industrySectorNames: Array<string>, companyId?: string): Array<SicCode> => {
  const mapped = [] as Array<SicCode>;

  if (!sicCodes.length) {
    return mapped;
  }

  sicCodes.forEach((code, index) => {
    let industrySectorName = '';

    /**
     * If industrySectorNames has value at index,
     * add to the object
     */
    if (industrySectorNames && industrySectorNames[index]) {
      industrySectorName = industrySectorNames[index];
    }

    const mappedCode = {
      sicCode: code,
      industrySectorName,
      company: {
        connect: {
          id: companyId,
        },
      },
    } as SicCode;

    mapped.push(mappedCode);
  });

  return mapped;
};

export default mapSicCodes;
