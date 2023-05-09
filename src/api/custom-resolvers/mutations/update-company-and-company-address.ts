import { Context } from '.keystone/types'; // eslint-disable-line
import { mapSicCodes } from '../../helpers/map-sic-codes';
import { UpdateCompanyAndExporterCompanyAddressVariables, ApplicationRelationship, SicCodes } from '../../types';

/**
 * updateCompanyAndExporterCompanyAddress
 * Update a company and company address
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the UpdateCompanyAndExporterCompanyAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with company ID
 */
const updateCompanyAndExporterCompanyAddress = async (
  root: any,
  variables: UpdateCompanyAndExporterCompanyAddressVariables,
  context: Context,
): Promise<ApplicationRelationship> => {
  try {
    console.info('Updating application company and exporter company address for ', variables.companyId);
    const { address, sicCodes, industrySectorNames, oldSicCodes, ...company } = variables.data;

    const updatedCompany = await context.db.Company.updateOne({
      where: { id: variables.companyId },
      data: company,
    });

    await context.db.ExporterCompanyAddress.updateOne({
      where: { id: variables.companyAddressId },
      data: address,
    });

    const mappedSicCodes = mapSicCodes(updatedCompany, sicCodes, industrySectorNames);

    // if the update contains company and there are oldSicCodes in the db, delete them
    if (company && oldSicCodes && oldSicCodes.length) {
      // delete already existing sic codes from oldSicCodes
      await context.db.ExporterCompanySicCode.deleteMany({
        where: oldSicCodes,
      });
    }

    if (mappedSicCodes && mappedSicCodes.length) {
      mappedSicCodes.forEach(async (sicCodeObj: SicCodes) => {
        await context.db.ExporterCompanySicCode.createOne({
          data: sicCodeObj,
        });
      });
    }

    return {
      id: variables.companyId,
    };
  } catch (err) {
    console.error('Error updating application - company and exporter company address', { err });

    throw new Error(`Updating application - company and exporter company address ${err}`);
  }
};

export default updateCompanyAndExporterCompanyAddress;
