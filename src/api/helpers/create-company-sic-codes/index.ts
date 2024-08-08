import mapSicCodes from '../map-sic-codes';
import { Context, SicCode } from '../../types';

/**
 * createCompanySicCodes
 * Map and create company SIC codes with industry sector names and company ID.
 * @param {Context} context: KeystoneJS context API
 * @param {String} companyId: Company ID
 * @param {Array} sicCodes: SIC codes
 * @param {Array} industrySectorNames: Industry sector names
 * @returns {Promise<Object>} Created company SIC codes
 */
const createCompanySicCodes = async (
  context: Context,
  companyId: string,
  sicCodes?: Array<string>,
  industrySectorNames?: Array<string>,
): Promise<Array<SicCode>> => {
  console.info('Creating company SIC codes for %s', companyId);

  try {
    if (sicCodes?.length) {
      const mappedSicCodes = mapSicCodes(sicCodes, industrySectorNames, companyId);

      const createdSicCodes = (await context.db.CompanySicCode.createMany({
        data: mappedSicCodes,
      })) as Array<SicCode>;

      return createdSicCodes;
    }

    return [];
  } catch (error) {
    console.error('Error creating company SIC codes for %s %O', companyId, error);

    throw new Error(`Creating company SIC codes for ${companyId} ${error}`);
  }
};

export default createCompanySicCodes;
