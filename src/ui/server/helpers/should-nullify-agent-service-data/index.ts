import { objectHasKeysAndValues } from '../object';
import { ApplicationExportContractAgent } from '../../../types';

/**
 * shouldNullifyAgentServiceData
 * Check if we should nullify agent service data.
 * If USING_AGENT is false and the application has some agent service data, the agent service data should be nullified.
 * @param {String} isUsingAgent: Is using agent form field
 * @param {ApplicationExportContractAgent} agent: Agent data
 * @returns {Boolean}
 */
const shouldNullifyAgentServiceData = (isUsingAgent: string, agent: ApplicationExportContractAgent) => {
  const {
    service: { id, charge, ...otherFields },
  } = agent;

  const hasAgentServiceData = objectHasKeysAndValues(otherFields);

  if (isUsingAgent === 'false' && hasAgentServiceData) {
    return true;
  }

  return false;
};

export default shouldNullifyAgentServiceData;
