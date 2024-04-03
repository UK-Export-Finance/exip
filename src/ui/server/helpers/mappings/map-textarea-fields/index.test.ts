import mapTextareaFields from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import replaceCharacterCodesWithCharacters from '../../replace-character-codes-with-characters';
import { mockApplication } from '../../../test-mocks';

const {
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES },
  },
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
    PRIVATE_MARKET: { DECLINED_DESCRIPTION },
  },
  POLICY: {
    BROKER_DETAILS: { FULL_ADDRESS: BROKER_ADDRESS },
    CREDIT_PERIOD_WITH_BUYER,
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { ADDRESS },
    CONNECTION_WITH_BUYER_DESCRIPTION,
    PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  },
} = INSURANCE_FIELD_IDS;

const { broker, business, buyer, company, exportContract, policy } = mockApplication;

describe('server/helpers/mappings/map-textarea-fields', () => {
  it('should return textarea fields with replaceCharacterCodesWithCharacters function', () => {
    const result = mapTextareaFields(mockApplication);

    const expected = {
      ...mockApplication,
      broker: {
        ...broker,
        [BROKER_ADDRESS]: replaceCharacterCodesWithCharacters(broker[BROKER_ADDRESS]),
      },
      business: {
        ...business,
        [GOODS_OR_SERVICES]: replaceCharacterCodesWithCharacters(business[GOODS_OR_SERVICES]),
      },
      buyer: {
        ...buyer,
        [ADDRESS]: replaceCharacterCodesWithCharacters(buyer[ADDRESS]),
        [PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: replaceCharacterCodesWithCharacters(buyer[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
        relationship: {
          ...buyer.relationship,
          [CONNECTION_WITH_BUYER_DESCRIPTION]: replaceCharacterCodesWithCharacters(buyer.relationship[CONNECTION_WITH_BUYER_DESCRIPTION]),
        },
      },
      company: {
        ...company,
        differentTradingAddress: {
          ...company.differentTradingAddress,
          [FULL_ADDRESS]: replaceCharacterCodesWithCharacters(company.differentTradingAddress[FULL_ADDRESS]),
        },
      },
      exportContract: {
        ...exportContract,
        [DESCRIPTION]: replaceCharacterCodesWithCharacters(exportContract[DESCRIPTION]),
        privateMarket: {
          ...exportContract.privateMarket,
          [DECLINED_DESCRIPTION]: replaceCharacterCodesWithCharacters(exportContract.privateMarket[DECLINED_DESCRIPTION]),
        },
      },
      policy: {
        ...policy,
        [CREDIT_PERIOD_WITH_BUYER]: replaceCharacterCodesWithCharacters(policy[CREDIT_PERIOD_WITH_BUYER]),
      },
    };

    expect(result).toEqual(expected);
  });
});
