import { Application } from '../../types';
import { TOTAL_CONTRACT_VALUE } from '../../constants';

/**
 * mapTotalContractValueOverThreshold
 * set for flag for if eligibility totalContractValue is above or below threshold
 * if below, set application totalContractValueOverThreshold to false
 * if above, set application totalContractValueOverThreshold to true
 * @param {Application} application
 * @returns {Application} modified application
 */
const mapTotalContractValueOverThreshold = (application: Application) => {
  const modifiedApplication = application;

  if (application?.eligibility?.totalContractValue?.value === TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE) {
    modifiedApplication.totalContractValueOverThreshold = true;
  } else {
    modifiedApplication.totalContractValueOverThreshold = false;
  }

  return modifiedApplication;
};

export default mapTotalContractValueOverThreshold;
