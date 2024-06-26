import mapPolicy from '.';
import { FIELD_VALUES } from '../../../constants';
import mapIntro from './map-intro';
import mapNameOnPolicy from './map-name-on-policy';
import mapSingleContractPolicy from './map-single-contract-policy';
import mapMultipleContractPolicy from './map-multiple-contract-policy';
import mapJointlyInsuredParty from './map-jointly-insured-party';
import mapCreditPeriod from './map-credit-period';
import mapBroker from './map-broker';
import mapLossPayee from './map-loss-payee';
import getPopulatedApplication from '../../../helpers/get-populated-application';
import { mockCountries } from '../../../test-mocks';
import { createFullApplication, getKeystoneContext, mapApplicationIds } from '../../../test-helpers';
import { Application, Context } from '../../../types';

describe('api/generate-xlsx/map-application-to-xlsx/map-policy', () => {
  let populatedApplicationMultiplePolicy: Application;
  let fullApplication: Application;
  let context: Context;

  beforeAll(async () => {
    context = getKeystoneContext();

    fullApplication = await createFullApplication(context);

    const multiplePolicyApplication = await createFullApplication(context, FIELD_VALUES.POLICY_TYPE.MULTIPLE);

    populatedApplicationMultiplePolicy = await getPopulatedApplication.get({ context, application: mapApplicationIds(multiplePolicyApplication) });
  });

  describe(`when the policy type is ${FIELD_VALUES.POLICY_TYPE.SINGLE}`, () => {
    it('should return an array of mapped fields via mapSingleContractPolicy', () => {
      const result = mapPolicy(fullApplication, mockCountries);

      const { nominatedLossPayee, policy, policyContact } = fullApplication;

      const expected = [
        ...mapIntro(policy),
        ...mapSingleContractPolicy(policy),

        ...mapNameOnPolicy(policyContact),

        ...mapCreditPeriod(policy),

        ...mapJointlyInsuredParty(policy.jointlyInsuredParty, mockCountries),

        ...mapBroker(fullApplication),
        ...mapLossPayee(nominatedLossPayee),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when the policy type is ${FIELD_VALUES.POLICY_TYPE.MULTIPLE}`, () => {
    it('should return an array of mapped fields via mapMultipleContractPolicy', () => {
      const result = mapPolicy(populatedApplicationMultiplePolicy, mockCountries);

      const { nominatedLossPayee, policy, policyContact } = populatedApplicationMultiplePolicy;

      const expected = [
        ...mapIntro(policy),
        ...mapMultipleContractPolicy(policy),

        ...mapNameOnPolicy(policyContact),

        ...mapCreditPeriod(policy),

        ...mapJointlyInsuredParty(policy.jointlyInsuredParty, mockCountries),

        ...mapBroker(fullApplication),
        ...mapLossPayee(nominatedLossPayee),
      ];

      expect(result).toEqual(expected);
    });
  });
});
