import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../types';
import api from '../../../api';
import generateGroupsAndTasks from '../../../helpers/task-list/generate-groups-and-tasks';
import generateTaskList from '../../../helpers/task-list';
import flattenApplicationData from '../../../helpers/flatten-application-data';
import { mockReq, mockRes, mockApplication } from '../../../test-mocks';

describe('controllers/insurance/all-sections', () => {
  let req: Request;
  let res: Response;

  const mockGetApplicationResponse = mockApplication;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(mockApplication.referenceNumber);
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ALL_SECTIONS);
    });
  });

  describe('get', () => {
    let getApplicationSpy = jest.fn(() => Promise.resolve(mockGetApplicationResponse));

    beforeEach(() => {
      api.keystone.getApplication = getApplicationSpy;
    });

    it('should call api.keystone.getApplication', async () => {
      await get(req, res);

      expect(getApplicationSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const flatApplicationData = flattenApplicationData(mockApplication);
      const taskListStructure = generateGroupsAndTasks();
      const expectedTaskListData = generateTaskList(taskListStructure, flatApplicationData);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ALL_SECTIONS,
          BACK_LINK: req.headers.referer,
        }),
        application: mockApplication,
        taskListData: expectedTaskListData,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.ALL_SECTIONS, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        // @ts-ignore
        getApplicationSpy = jest.fn(() => Promise.resolve());
        api.keystone.getApplication = getApplicationSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when there is an error with the API call', () => {
      beforeEach(() => {
        getApplicationSpy = jest.fn(() => Promise.reject());
        api.keystone.getApplication = getApplicationSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
