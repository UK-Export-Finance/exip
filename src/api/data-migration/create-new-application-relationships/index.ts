import { Context } from '.keystone/types'; // eslint-disable-line
import createLossPayee from './loss-payee';
import createJointlyInsuredParty from './jointly-insured-party';


const createNewApplicationRelationships = {
  lossPayee: (context: Context, applicationIdsConnectArray: Array<object>) => createLossPayee(context, applicationIdsConnectArray),
  jointlyInsuredParty: (context: Context, applications: Array<object>) => createJointlyInsuredParty(context, applications),
};

export default createNewApplicationRelationships;
