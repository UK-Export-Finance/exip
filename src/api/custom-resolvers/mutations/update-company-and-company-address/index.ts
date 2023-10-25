import mapSicCodes from '../../../helpers/map-sic-codes';
import { Relationship, Context, UpdateCompanyAndCompanyAddressVariables } from '../../../types';

/**
 * updateCompanyAndCompanyAddress
 * Update a company and company address
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the UpdateCompanyAndCompanyAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with company ID
 */
const updateCompanyAndCompanyAddress = async (root: any, variables: UpdateCompanyAndCompanyAddressVariables, context: Context): Promise<Relationship> => {
  try {
    console.info('Updating application company and company address for %s', variables.companyId);
    const { address, sicCodes, industrySectorNames, oldSicCodes, ...company } = variables.data;

    /**
     * set financialYearEndDate to null if it is not part of company so previous financialYearEndDate is removed
     * if companyNumber to ensure it is on companies house number submit
     * if no financialYear end date
     */
    if (company?.companyNumber && !company?.financialYearEndDate) {
      company.financialYearEndDate = null;
    }

    const updatedCompany = await context.db.Company.updateOne({
      where: { id: variables.companyId },
      data: company,
    });

    await context.db.CompanyAddress.updateOne({
      where: { id: variables.companyAddressId },
      data: address,
    });

    const mappedSicCodes = mapSicCodes(updatedCompany, sicCodes, industrySectorNames);

    // if the update contains company and there are oldSicCodes in the db, delete them
    if (company && oldSicCodes && oldSicCodes.length) {
      // delete already existing sic codes from oldSicCodes
      await context.db.CompanySicCode.deleteMany({
        where: oldSicCodes,
      });
    }

    // if there are sic codes to be added
    if (mappedSicCodes?.length) {
      await context.db.CompanySicCode.createMany({
        data: mappedSicCodes,
      });
    }

    return {
      id: variables.companyId,
    };
  } catch (err) {
    console.error('Error updating application - company and company address %O', err);

    throw new Error(`Updating application - company and company address ${err}`);
  }
};

export default updateCompanyAndCompanyAddress;
