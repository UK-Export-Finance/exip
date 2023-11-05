import { IndustrySector } from '../../types';

/**
 * maps through sic codes and matches to ukefIndustryId
 * returns string array of sic code descriptions
 * @param {Array<string>} sicCodes
 * @param {Array<IndustrySector>} sectors from API to match to sic codes for description
 * @returns {Array<string>} sic code descriptions
 */
const mapSicCodeDescriptions = (sicCodes: Array<string>, sectors: Array<IndustrySector>) => {
  const industrySectorNames = [] as Array<string>;

  // if sectors or sic codes is null or empty, then return empty array
  if (!sicCodes?.length || !sectors?.length) {
    return industrySectorNames;
  }

  sicCodes.forEach((sicCode) => {
    // finds matching sector from sic code
    const sicCodeSector = sectors.find((sector) => sector.ukefIndustryId === sicCode) as IndustrySector;

    // adds industry name to array of sic code descriptions
    industrySectorNames.push(sicCodeSector?.ukefIndustryName);
  });

  return industrySectorNames;
};

export default mapSicCodeDescriptions;
