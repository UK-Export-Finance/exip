import getBrokerDetailsPostRedirectUrl from '.';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';
import isChangeRoute from '../is-change-route';
import isCheckAndChangeRoute from '../is-check-and-change-route';
import brokerDetailsDataChangeFlags from '../broker-details-data-change-flags';
import basedInUkRedirectUrl from './based-in-uk';
import notBasedInUkRedirectUrl from './not-based-in-uk';
import { referenceNumber, mockApplication } from '../../test-mocks';

const { INSURANCE_ROOT } = INSURANCE_ROUTES;

const { IS_BASED_IN_UK } = POLICY_FIELD_IDS.BROKER_DETAILS;

const { broker: mockBroker } = mockApplication;

const mockOriginalUrl = '/mock-original-url';

const baseParams = {
  referenceNumber,
  originalUrl: mockOriginalUrl,
  brokerData: mockBroker,
};

const isAChangeRoute = isChangeRoute(mockOriginalUrl);
const isACheckAndChangeRoute = isCheckAndChangeRoute(mockOriginalUrl);

describe('server/helpers/src/ui/server/helpers/get-broker-details-post-redirect-url', () => {
  describe(`when the form body has ${IS_BASED_IN_UK} with a value of 'true'`, () => {
    const mockFormBody = {
      [IS_BASED_IN_UK]: 'true',
    };

    it('should return the result of basedInUkRedirectUrl', () => {
      const result = getBrokerDetailsPostRedirectUrl({
        ...baseParams,
        formBody: mockFormBody,
      });

      const { postcodeOrBuildingNumberNameHasChanged } = brokerDetailsDataChangeFlags(mockFormBody, mockBroker);

      const expected = basedInUkRedirectUrl({
        baseUrl: `${INSURANCE_ROOT}/${referenceNumber}`,
        isAChangeRoute,
        isACheckAndChangeRoute,
        postcodeOrBuildingNumberNameHasChanged,
      });

      expect(result).toEqual(expected);
    });
  });

  describe(`when the form body has ${IS_BASED_IN_UK} with a value of 'false'`, () => {
    const mockFormBody = {
      [IS_BASED_IN_UK]: 'false',
    };

    it('should return the result of notBasedInUkRedirectUrl', () => {
      const result = getBrokerDetailsPostRedirectUrl({
        ...baseParams,
        formBody: mockFormBody,
      });

      const { manualAddressRequired } = brokerDetailsDataChangeFlags(mockFormBody, mockBroker);

      const expected = notBasedInUkRedirectUrl({
        baseUrl: `${INSURANCE_ROOT}/${referenceNumber}`,
        isAChangeRoute,
        isACheckAndChangeRoute,
        manualAddressRequired,
      });

      expect(result).toEqual(expected);
    });
  });

  describe(`when the form body has ${IS_BASED_IN_UK} with a value that is not 'true' or 'false'`, () => {
    const mockFormBody = {
      [IS_BASED_IN_UK]: 'some other value',
    };

    it('should return the result of notBasedInUkRedirectUrl', () => {
      const result = getBrokerDetailsPostRedirectUrl({
        ...baseParams,
        formBody: mockFormBody,
      });

      const { manualAddressRequired } = brokerDetailsDataChangeFlags(mockFormBody, mockBroker);

      const expected = notBasedInUkRedirectUrl({
        baseUrl: `${INSURANCE_ROOT}/${referenceNumber}`,
        isAChangeRoute,
        isACheckAndChangeRoute,
        manualAddressRequired,
      });

      expect(result).toEqual(expected);
    });
  });
});
