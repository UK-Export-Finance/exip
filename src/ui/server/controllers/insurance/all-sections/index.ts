import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import generateGroupsAndTasks from '../../../helpers/task-list/generate-groups-and-tasks';
import generateTaskList from '../../../helpers/task-list';
import flattenApplicationData from '../../../helpers/flatten-application-data';
import mapApplicationToFormFields from '../../../helpers/mappings/map-application-to-form-fields';
import { Request, Response } from '../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ALL_SECTIONS;

/**
 * get
 * Render the All sections page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} All sections page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(ROUTES.INSURANCE.PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber, policy, exportContract, broker, company, declaration, buyer, totalContractValueOverThreshold } = application;
  const { policyType, jointlyInsuredParty } = policy;
  const {
    finalDestinationKnown,
    privateMarket: { attempted: attemptedPrivateMarketCover },
  } = exportContract;
  const { isUsingBroker } = broker;
  const { hasDifferentTradingName } = company;
  const { hasAntiBriberyCodeOfConduct } = declaration;
  const { buyerTradingHistory, relationship } = buyer;
  const { exporterIsConnectedWithBuyer, exporterHasPreviousCreditInsuranceWithBuyer } = relationship;
  const { outstandingPayments, exporterHasTradedWithBuyer } = buyerTradingHistory;

  const flatApplicationData = flattenApplicationData(application);

  const taskListStructure = generateGroupsAndTasks(
    referenceNumber,
    policyType,
    finalDestinationKnown,
    jointlyInsuredParty.requested,
    isUsingBroker,
    hasDifferentTradingName,
    hasAntiBriberyCodeOfConduct,
    exporterIsConnectedWithBuyer,
    exporterHasTradedWithBuyer,
    outstandingPayments,
    exporterHasPreviousCreditInsuranceWithBuyer,
    totalContractValueOverThreshold,
    attemptedPrivateMarketCover,
  );

  const taskListData = generateTaskList(taskListStructure, flatApplicationData);

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ALL_SECTIONS,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
    application: mapApplicationToFormFields(application),
    taskListData,
  });
};
