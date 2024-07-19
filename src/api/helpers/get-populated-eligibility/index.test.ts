import getPopulatedEligibility from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import country from '../../test-helpers/country';
import coverPeriod from '../../test-helpers/cover-period';
import totalContractValue from '../../test-helpers/total-contract-value';
import eligibility from '../../test-helpers/eligibility';
import { ApplicationEligibility, Context, Country, CoverPeriod, TotalContractValue } from '../../types';

describe('helpers/get-populated-company', () => {
  let context: Context;
  let createdCountry: Country;
  let createdCoverPeriod: CoverPeriod;
  let createdTotalContractValue: TotalContractValue;
  let createdEligibility: ApplicationEligibility;

  let totalContractValueConnectObject = {};
  let coverPeriodConnectObject = {};

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdCountry = (await country.create(context)) as Country;
    createdCoverPeriod = (await coverPeriod.create(context)) as CoverPeriod;
    createdTotalContractValue = (await totalContractValue.create(context)) as TotalContractValue;

    coverPeriodConnectObject = {
      connect: {
        id: createdCoverPeriod.id,
      },
    };

    totalContractValueConnectObject = {
      connect: {
        id: createdTotalContractValue.id,
      },
    };

    const eligibilityObject = {
      coverPeriod: coverPeriodConnectObject,
      totalContractValue: totalContractValueConnectObject,
    };

    createdEligibility = (await eligibility.create(context, eligibilityObject)) as ApplicationEligibility;
  });

  it('should return a populated eligibility', async () => {
    const result = await getPopulatedEligibility(context, createdEligibility.id, createdCountry);

    expect(result.id).toEqual(createdEligibility.id);

    expect(result.buyerCountry.id).toEqual(createdCountry.id);

    expect(result.coverPeriod.id).toEqual(createdCoverPeriod.id);

    expect(result.totalContractValue.id).toEqual(createdTotalContractValue.id);
  });

  describe('when an eligibility is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      try {
        await getPopulatedEligibility(context, invalidId, createdCountry);
      } catch (err) {
        const expected = `Getting populated eligibility ${invalidId}`;

        expect(String(err).includes(expected)).toEqual(true);
      }
    });
  });

  describe('when a coverPeriod is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      const eligibilityObject = {
        coverPeriod: {
          connect: {
            id: invalidId,
          },
        },
        totalContractValue: totalContractValueConnectObject,
      };

      const eligibilityNoCoverPeriod = (await eligibility.create(context, eligibilityObject)) as ApplicationEligibility;

      try {
        await getPopulatedEligibility(context, eligibilityNoCoverPeriod.id, createdCountry);
      } catch (err) {
        const expected = `Getting populated eligibility ${eligibilityNoCoverPeriod.id}`;

        expect(String(err).includes(expected)).toEqual(true);
      }
    });
  });

  describe('when a totalContractValue is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      const eligibilityObject = {
        coverPeriod: coverPeriodConnectObject,
        totalContractValue: {
          connect: {
            id: invalidId,
          },
        },
      };

      const eligibilityNoTotalContractValue = (await eligibility.create(context, eligibilityObject)) as ApplicationEligibility;

      try {
        await getPopulatedEligibility(context, eligibilityNoTotalContractValue.id, createdCountry);
      } catch (err) {
        const expected = `Getting populated eligibility ${eligibilityNoTotalContractValue.id}`;

        expect(String(err).includes(expected)).toEqual(true);
      }
    });
  });
});
