import nullifyAgentServiceData from '.';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';

const {
  AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
} = FIELD_IDS;

describe('server/helpers/nullify-agent-service-data', () => {
  it('should return an object with nullified values', () => {
    const result = nullifyAgentServiceData();

    const expected = {
      [IS_CHARGING]: null,
      [SERVICE_DESCRIPTION]: '',
    };

    expect(result).toEqual(expected);
  });
});
