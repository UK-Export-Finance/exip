import { Context } from '.keystone/types'; // eslint-disable-line
import accounts from './accounts';
import { mockApplicationEligibility } from '../test-mocks/mock-application';
import mockCompany from '../test-mocks/mock-company';
import mockCountries from '../test-mocks/mock-countries';
import { Application } from '../types';

import createAnApplicationHelper from '../helpers/create-an-application';

/**
 * createFullApplication
 * Create a full application for unit testing
 * @param {Context} context: KeystoneJS context API
 * @param {String} Policy type flag - different data is created if multiple is passed. Defaults to single.
 * @returns {Object} Application
 */
export const createFullApplication = async (context: Context): Promise<Application> => {
  const { buyerCountry } = mockApplicationEligibility;

  const countries = await context.query.Country.createMany({
    data: mockCountries,
    query: 'id isoCode name',
  });

  const country = countries.find((c) => c.isoCode === buyerCountry.isoCode);

  if (!country) {
    throw new Error('No country found from mock country ISO code');
  }

  const account = await accounts.create({ context });

  const application = await createAnApplicationHelper(
    {
      accountId: account.id,
      eligibilityAnswers: {},
      company: mockCompany,
    },
    context,
  );

  return application;
};

export default createFullApplication;
