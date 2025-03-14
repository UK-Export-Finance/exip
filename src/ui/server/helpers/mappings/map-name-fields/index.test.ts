import mapNameFields from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import replaceCharacterCodesWithCharacters from '../../replace-character-codes-with-characters';
import { mockApplication } from '../../../test-mocks';

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME },
  COMPANIES_HOUSE: { COMPANY_NAME },
  EXPORT_CONTRACT: {
    AGENT_DETAILS: { NAME: AGENT_NAME },
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { NAME: BUYER_NAME },
  },
  POLICY: {
    LOSS_PAYEE_DETAILS: { NAME: LOSS_PAYEE_NAME },
  },
} = INSURANCE_FIELD_IDS;

const characterCodes = '&lt;&gt;&quot;&#x27;&#x2F;&#42;&amp';

const mockStringWithCharacterCodes = String.raw`mock${characterCodes}`;

const mockApplicationWithCharacterCodes = {
  ...mockApplication,
  buyer: {
    ...mockApplication.buyer,
    [BUYER_NAME]: mockStringWithCharacterCodes,
  },
  company: {
    ...mockApplication.company,
    [COMPANY_NAME]: mockStringWithCharacterCodes,
  },
  exportContract: {
    ...mockApplication.exportContract,
    agent: {
      ...mockApplication.exportContract.agent,
      [AGENT_NAME]: mockStringWithCharacterCodes,
    },
  },
  policyContact: {
    ...mockApplication.policyContact,
    [FIRST_NAME]: mockStringWithCharacterCodes,
    [LAST_NAME]: mockStringWithCharacterCodes,
  },
  nominatedLossPayee: {
    ...mockApplication.nominatedLossPayee,
    [LOSS_PAYEE_NAME]: mockStringWithCharacterCodes,
  },
};

describe('server/helpers/mappings/map-name-fields', () => {
  it(`should replace character codes in buyer.${BUYER_NAME}`, () => {
    const result = mapNameFields(mockApplicationWithCharacterCodes);

    const fieldValue = mockApplicationWithCharacterCodes.buyer[BUYER_NAME];

    const expected = replaceCharacterCodesWithCharacters(fieldValue);

    expect(result.buyer[BUYER_NAME]).toEqual(expected);
  });

  it(`should replace character codes in company.${COMPANY_NAME}`, () => {
    const result = mapNameFields(mockApplicationWithCharacterCodes);

    const fieldValue = mockApplicationWithCharacterCodes.company[COMPANY_NAME];

    const expected = replaceCharacterCodesWithCharacters(fieldValue);

    expect(result.company[COMPANY_NAME]).toEqual(expected);
  });

  it(`should replace character codes in exportContract.agent.${AGENT_NAME}`, () => {
    const result = mapNameFields(mockApplicationWithCharacterCodes);

    const fieldValue = mockApplicationWithCharacterCodes.exportContract.agent[AGENT_NAME];

    const expected = replaceCharacterCodesWithCharacters(fieldValue);

    expect(result.exportContract.agent[AGENT_NAME]).toEqual(expected);
  });

  it(`should replace character codes in nominatedLossPayee.${LOSS_PAYEE_NAME}`, () => {
    const result = mapNameFields(mockApplicationWithCharacterCodes);

    const fieldValue = mockApplicationWithCharacterCodes.nominatedLossPayee[LOSS_PAYEE_NAME];

    const expected = replaceCharacterCodesWithCharacters(fieldValue);

    expect(result.nominatedLossPayee[LOSS_PAYEE_NAME]).toEqual(expected);
  });

  it(`should replace character codes in policyContact.${FIRST_NAME}`, () => {
    const result = mapNameFields(mockApplicationWithCharacterCodes);

    const fieldValue = mockApplicationWithCharacterCodes.policyContact[FIRST_NAME];

    const expected = replaceCharacterCodesWithCharacters(fieldValue);

    expect(result.policyContact[FIRST_NAME]).toEqual(expected);
  });

  it(`should replace character codes in policyContact.${LAST_NAME}`, () => {
    const result = mapNameFields(mockApplicationWithCharacterCodes);

    const fieldValue = mockApplicationWithCharacterCodes.policyContact[LAST_NAME];

    const expected = replaceCharacterCodesWithCharacters(fieldValue);

    expect(result.policyContact[LAST_NAME]).toEqual(expected);
  });
});
