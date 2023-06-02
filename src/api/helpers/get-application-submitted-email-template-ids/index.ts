import { ANSWERS, EMAIL_TEMPLATE_IDS } from '../../constants';
import { Application } from '../../types';

const {
  APPLICATION: {
    SUBMISSION: { EXPORTER, UNDERWRITING_TEAM },
  },
} = EMAIL_TEMPLATE_IDS;

/**
 * getApplicationSubmittedEmailTemplateIds
 * Get "application submitted" email template IDs team depending on submitted answers
 * @param {Object} Application
 * @returns {Object} Email template IDs for application owner/account and UKEF underwriting team
 */
const getApplicationSubmittedEmailTemplateIds = (application: Application) => {
  const { buyer, declaration } = application;

  const templateIds = {
    underwritingTeam: '',
    account: '',
  };

  const doesNotHaveAntiBriberyCodeOfConduct = declaration.hasAntiBriberyCodeOfConduct === ANSWERS.NO;
  const hasNotTradedWithBuyer = buyer.exporterHasTradedWithBuyer === ANSWERS.NO;

  if (doesNotHaveAntiBriberyCodeOfConduct && hasNotTradedWithBuyer) {
    /**
     * No documents required. Therefore:
     * - We do not need to send the applicant an email.
     * - We only need to send an email to the underwriting team.
     */
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NO_DOCUMENTS;

    return templateIds;
  }

  const hasAntiBriberyCodeOfConduct = declaration.hasAntiBriberyCodeOfConduct === ANSWERS.YES;

  if (hasAntiBriberyCodeOfConduct) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY;
  }

  const hasTradedWithBuyer = buyer.exporterHasTradedWithBuyer === ANSWERS.YES;

  if (hasTradedWithBuyer) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.TRADING_HISTORY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_TRADING_HISTORY;
  }

  if (hasAntiBriberyCodeOfConduct && hasTradedWithBuyer) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY_AND_TRADING_HISTORY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY;
  }

  return templateIds;
};

export default getApplicationSubmittedEmailTemplateIds;
