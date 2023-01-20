import goodsOrServices from './goods-or-services';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import generateValidationErrors from '../../../../../../helpers/validation';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELDS } from '../../../../../../content-strings/fields/insurance/your-business';

const { NATURE_OF_YOUR_BUSINESS: NATURE_OF_YOUR_BUSINESS_FIELDS } = FIELDS;

const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/nature-of-business/validation/rules/goods-or-services', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [GOODS_OR_SERVICES]: '',
  } as RequestBody;

  describe(`when the ${GOODS_OR_SERVICES} input is empty`, () => {
    it('should return a validation error', () => {
      const response = goodsOrServices(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[GOODS_OR_SERVICES].IS_EMPTY;
      const expected = generateValidationErrors(GOODS_OR_SERVICES, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${GOODS_OR_SERVICES} input is over ${NATURE_OF_YOUR_BUSINESS_FIELDS[GOODS_OR_SERVICES].MAXIMUM}} characters`, () => {
    it('should return a validation error', () => {
      mockBody[GOODS_OR_SERVICES] = 'a'.repeat(NATURE_OF_YOUR_BUSINESS_FIELDS[GOODS_OR_SERVICES].MAXIMUM + 1);
      const response = goodsOrServices(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[GOODS_OR_SERVICES].ABOVE_MAXIMUM;
      const expected = generateValidationErrors(GOODS_OR_SERVICES, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${GOODS_OR_SERVICES} input is valid`, () => {
    it('should return a validation error', () => {
      mockBody[GOODS_OR_SERVICES] = 'test';
      const response = goodsOrServices(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });
});
