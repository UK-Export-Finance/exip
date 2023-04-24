import { Sectors } from '../../types';

/**
 * maps through sic codes and matches to ukefIndustryId
 * returns string array of sic code descriptions
 * @param {Array<string>} sicCodes
 * @param {Array<Sectors>} sectors from API to match to sic codes for description
 * @returns {Array<string>} sic code descriptions
 */
const mapSicCodeDescriptions = (sicCodes: Array<string>, sectors: Array<Sectors>) => {
  const sicCodeDescriptions = [] as Array<string>;

  // if sectors or sic codes is null or empty, then return empty array
  if (!sicCodes || !sicCodes.length || !sectors || !sectors.length) {
    return sicCodeDescriptions;
  }

  sicCodes.forEach((sicCode) => {
    // finds matching sector from sic code
    const sicCodeSector = sectors.find((sector) => sector.ukefIndustryId === sicCode) as Sectors;

    // adds industry name to array of sic code descriptions
    sicCodeDescriptions.push(sicCodeSector?.ukefIndustryName);
  });

  return sicCodeDescriptions;
};

export default mapSicCodeDescriptions;
