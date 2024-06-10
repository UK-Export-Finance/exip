import { ApplicationPolicy } from '../../../types';

/**
 * mapPolicy
 * Map an application's policy data.
 * We need to transform date fields into a JavaScript date.
 * Otherwise, the dates are returned as a "datetime" type (from the database)
 * and the GraphQL call will fail.
 * @param {ApplicationPolicy} policy
 * @returns {ApplicationPolicy} mapped policy
 */
const mapPolicy = (policy: ApplicationPolicy) => {
  const { requestedStartDate, contractCompletionDate } = policy;

  const mappedPolicy = {
    ...policy,
    ...policy.jointlyInsuredParty,
    requestedStartDate: requestedStartDate ? new Date(requestedStartDate) : '',
    contractCompletionDate: contractCompletionDate ? new Date(contractCompletionDate) : '',
  } as ApplicationPolicy;

  return mappedPolicy;
};

export default mapPolicy;
