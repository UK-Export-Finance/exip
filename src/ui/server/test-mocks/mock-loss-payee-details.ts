import POLICY_FIELD_IDS from '../constants/field-ids/insurance/policy';

const { NAME, LOCATION, IS_LOCATED_IN_UK } = POLICY_FIELD_IDS.LOSS_PAYEE_DETAILS;

const mockLossPayeeDetails = {
  [NAME]: 'mock name',
  [LOCATION]: IS_LOCATED_IN_UK,
};

export default mockLossPayeeDetails;
