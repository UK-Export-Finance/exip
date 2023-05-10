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

  const hasAntiBriberyCodeOfConduct = declaration.hasAntiBriberyCodeOfConduct === ANSWERS.YES;

  if (hasAntiBriberyCodeOfConduct) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY;
  }

  const isConnectedWithBuyer = buyer.exporterHasTradedWithBuyer && buyer.exporterHasTradedWithBuyer === ANSWERS.YES;

  if (isConnectedWithBuyer) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.TRADING_HISTORY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_TRADING_HISTORY;
  }

  if (hasAntiBriberyCodeOfConduct && isConnectedWithBuyer) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY_AND_TRADING_HISTORY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY;
  }


  console.log('------- temporary debugging dev environment - buyer data \n', buyer);
  console.log('------- temporary debugging dev environment - declaration data \n', declaration);
  console.log('------- temporary debugging dev environment - hasAntiBriberyCodeOfConduct? ', hasAntiBriberyCodeOfConduct);
  console.log('------- temporary debugging dev environment - isConnectedWithBuyer? ', isConnectedWithBuyer);
  console.log('------- temporary debugging dev environment - templateIds \n', templateIds);

  return templateIds;
};

export default getApplicationSubmittedEmailTemplateIds;
