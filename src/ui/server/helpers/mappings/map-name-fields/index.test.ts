import mapNameFields from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import replaceCharacterCodesWithCharacters from '../../replace-character-codes-with-characters';
import { mockApplication } from '../../../test-mocks';

const {
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { NAME: BUYER_NAME, FIRST_NAME: BUYER_CONTACT_FIRST_NAME, LAST_NAME: BUYER_CONTACT_LAST_NAME },
  },
} = INSURANCE_FIELD_IDS;

const characterCodes = '&lt;&gt;&quot;&#x27;&#x2F;&#42;&amp';

const mockStringWithCharacterCodes = String.raw`mock${characterCodes}`;

const mockApplicationWithCharcterCodes = {
  ...mockApplication,
  buyer: {
    ...mockApplication.buyer,
    [BUYER_NAME]: mockStringWithCharacterCodes,
    [BUYER_CONTACT_FIRST_NAME]: mockStringWithCharacterCodes,
    [BUYER_CONTACT_LAST_NAME]: mockStringWithCharacterCodes,
  },
};

describe('server/helpers/mappings/map-name-fields', () => {
  it(`should replace character codes in buyer.${BUYER_NAME}`, () => {
    const result = mapNameFields(mockApplicationWithCharcterCodes);

    const fieldValue = mockApplicationWithCharcterCodes.buyer[BUYER_NAME];

    const expected = replaceCharacterCodesWithCharacters(fieldValue);

    expect(result.buyer[BUYER_NAME]).toEqual(expected);
  });

  it(`should replace character codes in buyer.${BUYER_CONTACT_FIRST_NAME}`, () => {
    const result = mapNameFields(mockApplicationWithCharcterCodes);

    const fieldValue = mockApplicationWithCharcterCodes.buyer[BUYER_CONTACT_FIRST_NAME];

    const expected = replaceCharacterCodesWithCharacters(fieldValue);

    expect(result.buyer[BUYER_CONTACT_FIRST_NAME]).toEqual(expected);
  });

  it(`should replace character codes in buyer.${BUYER_CONTACT_LAST_NAME}`, () => {
    const result = mapNameFields(mockApplicationWithCharcterCodes);

    const fieldValue = mockApplicationWithCharcterCodes.buyer[BUYER_CONTACT_LAST_NAME];

    const expected = replaceCharacterCodesWithCharacters(fieldValue);

    expect(result.buyer[BUYER_CONTACT_LAST_NAME]).toEqual(expected);
  });
});
