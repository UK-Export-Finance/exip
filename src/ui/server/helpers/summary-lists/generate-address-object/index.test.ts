import generateAddressObject from '.';
import replaceNewLineWithLineBreak from '../../replace-new-line-with-line-break';
import { mockApplicationBuyer } from '../../../test-mocks/mock-application';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { DEFAULT } from '../../../content-strings';

const { YOUR_BUYER: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  COMPANY_OR_ORGANISATION: { ADDRESS },
} = FIELD_IDS;

describe('server/helpers/summary-lists/generate-address-object', () => {
  describe('generateAddressObject', () => {
    describe('when an address is provided', () => {
      it('should return a fully populated object', () => {
        const mockAddress = mockApplicationBuyer[ADDRESS];

        const response = generateAddressObject(mockAddress);

        const address = replaceNewLineWithLineBreak(mockAddress);

        const expected = {
          address,
        };

        expect(response).toEqual(expected);
      });
    });

    describe('when an address is not provided', () => {
      it(`should return an object containing ${DEFAULT.EMPTY} for the address`, () => {
        const response = generateAddressObject();

        const address = DEFAULT.EMPTY;

        const expected = {
          address,
        };

        expect(response).toEqual(expected);
      });
    });
  });
});
