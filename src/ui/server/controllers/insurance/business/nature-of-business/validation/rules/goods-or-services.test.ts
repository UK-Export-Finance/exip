import goodsOrServices from './goods-or-services';
import { FIELD_IDS, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../test-mocks';

const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES: FIELD_ID },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/nature-of-business/validation/rules/goods-or-services', () => {
  const mockBody = {};

  it('should return the result of providedAndMaxLength', () => {
    const response = goodsOrServices(mockBody, mockErrors);

    const expected = providedAndMaxLength(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.BUSINESS.GOODS_OR_SERVICES_DESCRIPTION);

    expect(response).toEqual(expected);
  });
});
