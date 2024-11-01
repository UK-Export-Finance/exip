import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getPolicyById
 * Get a policy by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Policy ID
 * @returns {Promise<ApplicationPolicy>}
 */
const getPolicyById = async (context: Context, id: string) => {
  try {
    console.info('Getting policy by ID %s', id);

    const policy = await context.query.Policy.findOne({
      where: { id },
      query:
        'id policyType requestedStartDate contractCompletionDate requestedCreditLimit totalValueOfContract creditPeriodWithBuyer policyCurrencyCode totalMonthsOfCover totalSalesToBuyer maximumBuyerWillOwe needPreCreditPeriodCover jointlyInsuredParty { id companyName companyNumber countryCode requested }',
    });

    return policy;
  } catch (error) {
    console.error('Getting policy by ID %s %o', id, error);

    throw new Error(`Error Getting policy by ID ${id} ${error}`);
  }
};

export default getPolicyById;
