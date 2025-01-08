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
  const mappedPolicy: ApplicationPolicy = {
    ...policy,
  };

  if (policy.requestedStartDate) {
    const { requestedStartDate } = policy;

    mappedPolicy.requestedStartDate = new Date(requestedStartDate);
  }

  if (policy.contractCompletionDate) {
    const { contractCompletionDate } = policy;

    mappedPolicy.contractCompletionDate = new Date(contractCompletionDate);
  }

  return mappedPolicy;
};

export default mapPolicy;
