import { Context } from '.keystone/types'; // eslint-disable-line
import { mapSicCodes } from '../../helpers/map-sic-codes';
import { UpdateCompanyAndCompanyAddressVariables, ApplicationRelationship } from '../../types';

/**
 * updateCompanyAndCompanyAddress
 * Update a company and company address
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the UpdateCompanyAndCompanyAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with company ID
 */
const updateCompanyAndCompanyAddress = async (
  root: any,
  variables: UpdateCompanyAndCompanyAddressVariables,
  context: Context,
): Promise<ApplicationRelationship> => {
  try {
    console.info('Updating application company and company address for ', variables.companyId);
    const { address, sicCodes, industrySectorNames, oldSicCodes, ...company } = variables.data;

    const updatedCompany = await context.db.Company.updateOne({
      where: { id: variables.companyId },
      data: company,
    });

    await context.db.CompanyAddress.updateOne({
      where: { id: variables.companyAddressId },
      data: address,
    });

    const mappedSicCodes = mapSicCodes(updatedCompany, sicCodes, industrySectorNames);

    // TODO: EMS-1080 Delete console logs
    // eslint-disable-next-line no-console
    console.log('mappedSicCodes', mappedSicCodes);

    // eslint-disable-next-line no-console
    console.log('deleting old sic codes - ', oldSicCodes);
    // if the update contains company and there are oldSicCodes in the db, delete them
    if (company && oldSicCodes && oldSicCodes.length) {
      // delete already existing sic codes from oldSicCodes
      const deleted = await context.db.CompanySicCode.deleteMany({
        where: oldSicCodes,
      });

      // eslint-disable-next-line no-console
      console.log('deleted sic codes', deleted);
    }

    // if there are sic codes to be added
    if (mappedSicCodes && mappedSicCodes.length) {
      // eslint-disable-next-line no-console
      console.log('reinserting sic codes', mappedSicCodes);

      const companySicReinserted = await context.db.CompanySicCode.createMany({
        data: mappedSicCodes,
      });

      // eslint-disable-next-line no-console
      console.log('finished re-insert each sic', companySicReinserted);
    }

    return {
      id: variables.companyId,
    };
  } catch (err) {
    console.error('Error updating application - company and company address', { err });

    throw new Error(`Updating application - company and company address ${err}`);
  }
};

export default updateCompanyAndCompanyAddress;
