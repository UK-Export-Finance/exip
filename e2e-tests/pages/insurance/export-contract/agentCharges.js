import { field } from '../../shared';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';

const { AGENT_CHARGES: { METHOD, FIXED_SUM, PERCENTAGE } } = FIELD_IDS;

const agentCharges = {
  [METHOD]: {
    [FIXED_SUM]: field(`${METHOD}-${FIXED_SUM}`),
    [PERCENTAGE]: field(`${METHOD}-${PERCENTAGE}`),
  },
};

export default agentCharges;
