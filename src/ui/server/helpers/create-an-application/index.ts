import { sanitiseData } from '../sanitise-data';
import mapEligibilityAnswers from '../map-eligibility-answers';
import api from '../../api';
import { SubmittedDataInsuranceEligibility } from '../../../types';

interface ApplicationCreationResponse {
  success: boolean;
  referenceNumber?: number;
}

/**
 * createAnApplication
 * Create an application
 * 1) Sanitise eligibility answers.
 * 2) Map sanitised eligibility answers.
 * 3) Create an application via the API
 * @param {SubmittedDataInsuranceEligibility} eligibilitySessionData: Eligibility answers
 * @param {String} userId: User ID
 * @returns {Application} Created application
 */
const createAnApplication = async (eligibilitySessionData: SubmittedDataInsuranceEligibility, userId: string): Promise<ApplicationCreationResponse> => {
  try {
    console.info('Creating an application for user %s', userId);

    const sanitisedData = sanitiseData(eligibilitySessionData);

    const eligibilityAnswers = mapEligibilityAnswers(sanitisedData);

    const application = await api.keystone.application.create(eligibilityAnswers, userId);

    return application;
  } catch (error) {
    console.error('Error creating an application for user %s', userId);

    throw new Error(`Error creating an application for user %s ${userId}`);
  }
};

const application = {
  create: createAnApplication,
};

export default application;
