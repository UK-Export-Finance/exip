import goodsOrServices, { MAXIMUM } from './goods-or-services';
import { FIELD_IDS } from '../../../../../../constants';
import generateValidationErrors from '../../../../../../helpers/validation';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES: FIELD_ID },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/nature-of-business/validation/rules/goods-or-services', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  describe(`when the ${FIELD_ID} input is empty`, () => {
    it('should return a validation error', () => {
      const response = goodsOrServices(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.IS_EMPTY;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${FIELD_ID} input is over ${MAXIMUM} characters`, () => {
    it('should return a validation error', () => {
      const mockValue = Number(MAXIMUM) + 1;

      mockBody[FIELD_ID] = 'a'.repeat(mockValue);
      const response = goodsOrServices(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.ABOVE_MAXIMUM;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${FIELD_ID} input is valid`, () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = 'test';
      const response = goodsOrServices(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });
});
