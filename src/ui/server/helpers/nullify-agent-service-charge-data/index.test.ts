import nullifyAgentServiceChargeData from '.';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';

const {
  AGENT_CHARGES: { PERCENTAGE_CHARGE, FIXED_SUM_AMOUNT, METHOD, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

describe('server/helpers/nullify-agent-service-charge-data', () => {
  it('should return an object with nullified values', () => {
    const result = nullifyAgentServiceChargeData();

    const expected = {
      [PERCENTAGE_CHARGE]: null,
      [FIXED_SUM_AMOUNT]: null,
      [METHOD]: null,
      [PAYABLE_COUNTRY_CODE]: '',
    };

    expect(result).toEqual(expected);
  });
});
