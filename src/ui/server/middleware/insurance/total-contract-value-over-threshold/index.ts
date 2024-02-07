import { Application } from '../../../../types';
import { TOTAL_CONTRACT_VALUE } from '../../../constants';

/**
 * totalContractValueOverThreshold
 * checks if eligibility totalContractValue is above or below threshold
 * if below, then sets application totalContractValueOverThreshold to false
 * if above, then sets application totalContractValueOverThreshold to true
 * @param {Application} application
 * @returns {Application} modifiedApplication
 */
const totalContractValueOverThreshold = (application: Application) => {
  const modifiedApplication = application;

  if (application?.eligibility?.totalContractValue?.value === TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE) {
    modifiedApplication.totalContractValueOverThreshold = true;
  } else {
    modifiedApplication.totalContractValueOverThreshold = false;
  }

  return modifiedApplication;
};

export default totalContractValueOverThreshold;
