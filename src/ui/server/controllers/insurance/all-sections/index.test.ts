import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import generateGroupsAndTasks from '../../../helpers/task-list/generate-groups-and-tasks';
import generateTaskList from '../../../helpers/task-list';
import flattenApplicationData from '../../../helpers/flatten-application-data';
import mapApplicationToFormFields from '../../../helpers/mappings/map-application-to-form-fields';
import { Request, Response } from '../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../test-mocks';

const { PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/all-sections', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ALL_SECTIONS);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const { referenceNumber, policy, exportContract, broker, declaration, company, buyer, totalContractValueOverThreshold } = mockApplication;

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

      const flatApplicationData = flattenApplicationData(mockApplication);

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

      const expectedTaskListData = generateTaskList(taskListStructure, flatApplicationData);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ALL_SECTIONS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        taskListData: expectedTaskListData,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.ALL_SECTIONS, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
