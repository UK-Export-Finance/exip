import requiredFields, { workingWithBuyerTasks } from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';

const YOUR_BUYER_FIELD_IDS = INSURANCE_FIELD_IDS.YOUR_BUYER;

const { REGISTRATION_NUMBER, WEBSITE: BUYER_WEBSITE, COUNTRY, ...COMPANY_OR_ORGANISATION_FIELDS } = YOUR_BUYER_FIELD_IDS.COMPANY_OR_ORGANISATION;
const { CONNECTION_WITH_BUYER_DESCRIPTION, CONNECTION_WITH_BUYER, TRADED_WITH_BUYER } = YOUR_BUYER_FIELD_IDS.WORKING_WITH_BUYER;

describe('server/helpers/required-fields/your-buyer', () => {
  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields(true);

      const expected = Object.values({
        ...COMPANY_OR_ORGANISATION_FIELDS,
        ...workingWithBuyerTasks(true),
      });

      expect(result).toEqual(expected);
    });
  });

  describe('workingWithBuyerTasks', () => {
    describe('when connectedWithBuyer is "true"', () => {
      it('should return array of relevant working with buyer fields', () => {
        const result = workingWithBuyerTasks(true);

        const expected = [CONNECTION_WITH_BUYER_DESCRIPTION, CONNECTION_WITH_BUYER, TRADED_WITH_BUYER];

        expect(result).toEqual(expected);
      });
    });

    describe('when connectedWithBuyer is "false"', () => {
      it('should return array of relevant working with buyer fields', () => {
        const result = workingWithBuyerTasks(false);

        const expected = [CONNECTION_WITH_BUYER, TRADED_WITH_BUYER];

        expect(result).toEqual(expected);
      });
    });
  });
});
